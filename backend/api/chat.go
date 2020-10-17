package api

import (
	"github.com/gin-gonic/gin"
)

func InitChat(rg *gin.RouterGroup) {
	router := rg.Group("/chat")
	{
		router.GET("/create/:id", createChatRoom)
		router.GET("/getlog/:id", getChatLog)
		router.POST("/chat/:id", sendChat)
	}
}

// 채팅방 개설
func createChatRoom(c *gin.Context) {

}

// 채팅 로그 가져오기
func getChatLog(c *gin.Context) {

}

// 채팅 보내기
func sendChat(c *gin.Context) {

}
