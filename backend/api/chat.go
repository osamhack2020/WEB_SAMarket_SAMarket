package api

import (
	"encoding/json"
	"sam/middleware"
	"sam/models"
	"sam/ws"
	"strconv"

	"github.com/gin-gonic/gin"
)

func InitChatRouter(rg *gin.RouterGroup) {
	router := rg.Group("/chat")
	{
		router.Use(middleware.TokenAuth)
		router.GET("/create/:postid", createChatRoom)
		router.GET("/rooms", getChatRooms)
		router.GET("/msg/list/:roomid", getChatMsgList)
		router.POST("/msg/send", addChatMsg)
		router.GET("/chat/end/:roomid", endChat)
	}
}

// createChatRoom godoc
// @Security ApiKeyAuth
// @Summary 채팅방 만들기
// @Description Post ID 기준으로 판매자와의 채팅방 개설, 이미 존재하는 경우 에러
// @Accept  json
// @Produce  json
// @Param postid path string true "게시글 id"
// @Router /chat/create/{postid} [get]
// @Success 200 {object} models.ChatRoom
// @Failure 400 {object} BadRequestResult
func createChatRoom(c *gin.Context) {
	param := c.Param("postid")
	postID, _ := strconv.Atoi(param)
	user := GetSessionUser(c)
	// 요청자가 가진 relation 중에 해당 post id를 가진 chatroom 이 존재?
	post := models.PostStore.GetPost(postID)
	// 판매자는 채팅방 개설 불가
	if user.ID == post.AuthorID {
		ResponseBadRequest(c, "판매자는 채팅방 개설이 불가합니다.")
		return
	}
	if chatRoom := models.ChatStore.GetChatRoom(post.ID, user.ID); len(chatRoom) > 0 {
		// 채팅방이 이미 존재
		ResponseOK(c, chatRoom)
		return
	}
	// 없다면 새로 생성
	chatRoom := &models.ChatRoom{PostID: postID, Title: post.Title}
	models.ChatStore.AddChatRoom(chatRoom)
	// relation 추가
	models.ChatStore.AddUserInChatRoom(chatRoom.ID, user.ID)
	models.ChatStore.AddUserInChatRoom(chatRoom.ID, post.AuthorID)
}

// getChatRooms godoc
// @Security ApiKeyAuth
// @Summary 채팅방 목록 가져오기
// @Description 채팅방 목록 가져오기
// @Accept  json
// @Produce  json
// @Router /chat/rooms [get]
// @Success 200 {object} []models.ChatRoom
// @Failure 400 {object} BadRequestResult
func getChatRooms(c *gin.Context) {
	user := GetSessionUser(c)
	ResponseOK(c, models.ChatStore.GetChatRoomsByUser(user))
}

// getChatMsg godoc
// @Security ApiKeyAuth
// @Summary 채팅로그 가져오기
// @Description 채팅로그 가져오기 (가져온거 전부 읽음 표시 됨)
// @Accept  json
// @Produce  json
// @Param roomid path string true "채팅방 id"
// @Router /chat/msg/list/{roomid} [get]
// @Success 200 {object} ChatMsgsResult
// @Failure 400 {object} BadRequestResult
func getChatMsgList(c *gin.Context) {
	user := GetSessionUser(c)
	roomID := c.Param("roomid")
	id, _ := strconv.Atoi(roomID)
	room := models.ChatStore.GetChatRoomByID(id)
	msgs := models.ChatStore.GetChatMsgList(id)
	models.ChatStore.MakeRead(user.ID, id)
	ResponseOK(c, ChatMsgsResult{ChatRoom: room, ChatMsgs: msgs})
}

// addChatMsg godoc
// @Security ApiKeyAuth
// @Summary 채팅 보내기
// @Description chatRoomID하고 content만
// @Accept  json
// @Produce  json
// @Param payload body AddChatMsgRequest true "로그인 정보"
// @Router /chat/msg/send [post]
// @Success 200 {object} models.ChatMsg
// @Failure 400 {object} BadRequestResult
func addChatMsg(c *gin.Context) {
	var msg *models.ChatMsg
	c.ShouldBindJSON(&msg)
	user := GetSessionUser(c)
	msg.SenderID = user.ID
	chatRoomUsers := models.ChatStore.GetUsersInChatRoom(models.ChatRoom{ID: msg.ChatRoomID})
	var isIn bool = false
	for i := range chatRoomUsers {
		if chatRoomUsers[i].ID == user.ID {
			isIn = true
			break
		}
	}
	if !isIn {
		ResponseBadRequest(c, "해당 채팅방에 소속되어 있지 않습니다.")
		return
	}
	msg.Unread = 1
	models.ChatStore.AddChatMsg(msg)
	msg.Sender = user
	for _, receiver := range chatRoomUsers {
		// 메시지 보낸 사람 외 다른사람들에게만 웹소켓 전송
		if receiver.ID != msg.SenderID {
			eventObjBytes, _ := json.Marshal(ws.WSChatEvent{ChatRoomID: msg.ChatRoomID, ChatMsg: *msg, UnreadCount: models.ChatStore.GetUnreadCount(receiver.ID)})
			eventJSON := string(eventObjBytes)
			ws.PublishMessage(receiver.ID, eventJSON)
		}
	}
	ResponseOK(c, msg)
}

// endChat godoc
// @Security ApiKeyAuth
// @Summary 채팅 종료 (거래 확정)
// @Accept  json
// @Produce  json
// @Param payload body AddChatMsgRequest true "로그인 정보"
// @Router /chat/end/{roomid} [get]
// @Success 200 {object} models.ChatMsg
// @Failure 400 {object} BadRequestResult
func endChat(c *gin.Context) {
	param := c.Param("roomid")
	id, _ := strconv.Atoi(param)
	chatRoom := models.ChatStore.GetChatRoomByID(id)
	// 현재 채팅 Status를 1로 변경
	// 해당 포스트로 생성된 다른 채팅 Status를 2로 변경
	models.ChatStore.UpdateChatStatus(chatRoom.PostID, chatRoom.ID)
	// TODO 거래 확정이라고 알림
}
