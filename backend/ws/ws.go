package ws

import (
	"sam/middleware"
	"sam/models"

	"github.com/gin-gonic/gin"
)

func SetupTest(r *gin.Engine) {
	hub := newHub()
	go hub.run()
	rg := r.Group("/ws")
	{
		rg.GET("/", func(c *gin.Context) {
			serveWs(hub, c.Writer, c.Request)
		})

		rg.Use(middleware.TokenAuth)
		rg.GET("/:id", func(c *gin.Context) {
			val, _ := c.Get("user")
			if user, ok := val.(models.User); ok {
				if user.Id == c.Param("id") {
					serveWs(hub, c.Writer, c.Request)
				}
			}
		})
	}
}
