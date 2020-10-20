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
		router.POST("/review/add", addReview)
		router.GET("/review/list/:userid", getReviewList)
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
	fmt.Println("count: ", count)
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
	roomID := c.Param("roomid")
	id, _ := strconv.Atoi(roomID)
	msgs := models.ChatStore.GetChatMsgList(id)
	c.JSON(200, msgs)
}

type AddChatMsgRequest struct {
	ChatRoomID int
	Content    string
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
	if user, ok := val.(models.User); ok {
		msg.SenderID = user.ID
	}
	// Todo: validate user in chatroom
	models.ChatStore.AddChatMsg(*msg)
	chatRoomUsers := models.ChatStore.GetUsersInChatRoom(models.ChatRoom{ID: msg.ChatRoomID})
	eventObjBytes, _ := json.Marshal(ws.WSEvent{ChatRoomID: 0, ChatMsg: *msg, UnreadCount: 0})
	eventJSON := string(eventObjBytes)
	for _, receiver := range chatRoomUsers {
		// 메시지 보낸 사람 외 다른사람들에게만 웹소켓 전송
		if receiver.ID != msg.SenderID {
			ws.PublishMessage(receiver.ID, eventJSON)
		}
	}
}

// addReview godoc
// @Security ApiKeyAuth
// @Summary 판매 채팅후기 남기기 (판매자->구매자 또는 구매자->판매자 모두 가능)
// @Description
// @Accept  json
// @Produce  json
// @Param payload body LoginRequest true "로그인 정보"
// @Router /chat/review/add [post]
// @Success 200 {object} []models.ChatRoom
func addReview(c *gin.Context) {

}

// getReviewList godoc
// @Security ApiKeyAuth
// @Summary 해당 유저 후기 리스트 가져오기
// @Description
// @Accept  json
// @Produce  json
// @Param payload body LoginRequest true "로그인 정보"
// @Router /chat/review/list [post]
// @Success 200 {object} []models.ChatRoom
func getReviewList(c *gin.Context) {

}
