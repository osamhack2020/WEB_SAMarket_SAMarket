package ws

import (
	"github.com/gin-gonic/gin"
)

func SetupTest(r *gin.Engine) {
	hub := newHub()
	go hub.run()
	r.GET("/ws", func(c *gin.Context) {
		serveWs(hub, c.Writer, c.Request)
	})
}
