package api

import (
	"github.com/gin-gonic/gin"
)

func InitChat(rg *gin.RouterGroup) {
	router := rg.Group("/chat")
	{
		router.POST("/create", createChatRoom)
		router.GET("/log/:id", getChatLog)
		router.GET("/rooms", getChatRooms)
		router.POST("/send", sendChat)
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
// @Router /chat/rooms [get]
// @Success 200 {object} []models.ChatRoom
func getChatRooms(c *gin.Context) {

}

// getChatLog godoc
// @Security ApiKeyAuth
// @Summary 채팅로그 가져오기
// @Description 채팅로그 가져오기
// @Accept  json
// @Produce  json
// @Router /chat/log/:id [get]
// @Success 200 {object} []models.ChatRoom
func getChatLog(c *gin.Context) {

}

// sendChat godoc
// @Security ApiKeyAuth
// @Summary 채팅 보내기
// @Description 채팅 보내기
// @Accept  json
// @Produce  json
// @Router /chat/send [post]
// @Success 200 {object} []models.ChatRoom
func sendChat(c *gin.Context) {

}
