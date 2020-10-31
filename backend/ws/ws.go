package ws

import (
	"sam/config"
	"sam/middleware"
	"sam/models"

	"github.com/gin-gonic/gin"
)

var hub *Hub

type WSTestRequest struct {
	// 대상 uuid
	UUID string
	// 보낼 메시지
	MSG string
}

type WSChatEvent struct {
	ChatRoomID  int
	ChatMsg     models.ChatMsg
	UnreadCount int64
}

type WSNotiEvent struct {
	NotiID int
	Noti   models.Noti
}

func PublishMessage(uuid string, msg string) {
	hub.publish(uuid, msg)
}

// testSocket godoc
// @Summary 웹소켓 메시지 테스트 (디버그 전용)
// @Description 웹소켓 메시지 테스트
// @Description 해당 UUID 웹소켓에 msg 전송
// @ID  testSocket
// @name  testSocket
// @Accept  json
// @Produce  json
// @Param payload body WSTestRequest true "테스트 요청 정보"
// @Router /ws/test [post]
// @Success 200 {object} string
func testSocket(c *gin.Context) {
	var rq *WSTestRequest
	c.ShouldBindJSON(&rq)
	hub.publish(rq.UUID, rq.MSG)
}

// accept godoc
// @Security ApiKeyAuth
// @Summary 웹소켓 등록
// @Description Swagger에서 하지말고 Websocket 등록해서 테스트 (Param X, 쿠키로 인증)
// @Description Example은 WS에서 받는 예제 데이터
// @ID  accpetWS
// @name  acceptWS
// @Accept  json
// @Produce  json
// @Router /ws [get]
// @Success 200 {object} WSChatEvent
func accept(c *gin.Context) {
	val, _ := c.Get("user")
	if user, ok := val.(models.User); ok {
		serveWs(user.ID, hub, c.Writer, c.Request)
	}
}

func SetupWebSocket(r *gin.Engine) {
	hub = newHub()
	go hub.run()
	rg := r.Group("/api/ws")
	{
		if config.Settings.Server.Mode == "debug" {
			rg.POST("/test", testSocket)
		}
		rg.Use(middleware.TokenAuth)
		rg.GET("", accept)
	}
}
