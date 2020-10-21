package api

import (
	"encoding/json"
	"fmt"
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
func createChatRoom(c *gin.Context) {
	param := c.Param("postid")
	postID, _ := strconv.Atoi(param)
	val, _ := c.Get("user")
	// 요청자가 가진 relation 중에 해당 post id를 가진 chatroom 이 존재?
	user, _ := val.(models.User)
	post := models.PostStore.GetPost(postID)
	// 판매자는 채팅방 개설 불가
	if user.ID == post.AuthorID {
		c.JSON(400, "불가")
		return
	}
	count := models.ChatStore.CheckChatRoomExists(post.ID, user.ID)
	if count == 1 {
		// 채팅방이 이미 존재
		return
	}
	// 없다면
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
func getChatRooms(c *gin.Context) {
	val, _ := c.Get("user")
	if user, ok := val.(models.User); ok {
		fmt.Println("user: ", user)
		c.JSON(200, models.ChatStore.GetChatRoomsByUser(user))
	}
}

// getChatMsg godoc
// @Security ApiKeyAuth
// @Summary 채팅로그 가져오기
// @Description 채팅로그 가져오기 (가져온거 전부 읽음 표시 됨)
// @Accept  json
// @Produce  json
// @Param roomid path string true "채팅방 id"
// @Router /chat/msg/list/{roomid} [get]
// @Success 200 {object} []models.ChatRoom
func getChatMsgList(c *gin.Context) {
	val, _ := c.Get("user")
	user, _ := val.(models.User)
	roomID := c.Param("roomid")
	id, _ := strconv.Atoi(roomID)
	msgs := models.ChatStore.GetChatMsgList(id)
	models.ChatStore.MakeRead(user.ID, id)
	c.JSON(200, msgs)
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
func addChatMsg(c *gin.Context) {
	var msg *models.ChatMsg
	c.ShouldBindJSON(&msg)
	val, _ := c.Get("user")
	user, _ := val.(models.User)
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
		return
	}
	msg.Unread = 1
	models.ChatStore.AddChatMsg(*msg)

	for _, receiver := range chatRoomUsers {
		// 메시지 보낸 사람 외 다른사람들에게만 웹소켓 전송
		if receiver.ID != msg.SenderID {
			eventObjBytes, _ := json.Marshal(ws.WSChatEvent{ChatRoomID: msg.ChatRoomID, ChatMsg: *msg, UnreadCount: models.ChatStore.GetUnreadCount(receiver.ID)})
			eventJSON := string(eventObjBytes)
			ws.PublishMessage(receiver.ID, eventJSON)
		}
	}
}
