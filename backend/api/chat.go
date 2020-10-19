package api

import (
	"sam/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func InitChatRouter(rg *gin.RouterGroup) {
	router := rg.Group("/chat")
	{
		router.POST("/create", createChatRoom)
		router.GET("/rooms", getChatRooms)
		router.GET("/msg/list/:roomid", getChatMsgList)
		router.POST("/msg/send", addChatMsg)
	}
}

// createChatRoom godoc
// @Security ApiKeyAuth
// @Summary 채팅방 만들기
// @Description 채팅방 만들기
// @Accept  json
// @Produce  json
// @Router /chat/create [post]
// @Success 200 {object} models.ChatRoom
func createChatRoom(c *gin.Context) {

}

// getChatRooms godoc
// @Security ApiKeyAuth
// @Summary 채팅방 목록 가져오기
// @Description 채팅방 목록 가져오기
// @Accept  json
// @Produce  json
// @Router /msg/list/:roomid [get]
// @Success 200 {object} []models.ChatRoom
func getChatRooms(c *gin.Context) {

}

// getChatMsg godoc
// @Security ApiKeyAuth
// @Summary 채팅로그 가져오기
// @Description 채팅로그 가져오기
// @Accept  json
// @Produce  json
// @Router /chat/msg/list/{roomid} [get]
// @Success 200 {object} []models.ChatRoom
func getChatMsgList(c *gin.Context) {
	roomID := c.Param("roomid")
	id, _ := strconv.Atoi(roomID)
	msgs := models.ChatStore.GetChatMsgList(id)
	c.JSON(200, msgs)
}

// addChatMsg godoc
// @Security ApiKeyAuth
// @Summary 채팅 보내기
// @Description chatRoomID하고 content만
// @Accept  json
// @Produce  json
// @Param payload body LoginRequest true "로그인 정보"
// @Router /chat/send [post]
// @Success 200 {object} []models.ChatRoom
func addChatMsg(c *gin.Context) {
	var msg *models.ChatMsg
	c.ShouldBindJSON(&msg)
	val, _ := c.Get("user")
	if user, ok := val.(models.User); ok {
		msg.SenderID = user.ID
	}
	models.ChatStore.AddChatMsg(*msg)
}
