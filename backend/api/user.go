package api

import (
	"sam/middleware"
	"sam/models"

	"github.com/gin-gonic/gin"
)

func InitUserRouter(rg *gin.RouterGroup) {
	router := rg.Group("/user")
	{
		router.Use(middleware.TokenAuth)
		router.GET("/test", getUser)
	}
}

// getUser godoc
// @Security ApiKeyAuth
// @Summary 해당 유저 프로파일 조회
// @Description
// @name getUser
// @Accept  json
// @Produce  json
// @Header 200 {string} Token "qwerty"
// @Router /user/test [get]
// @Success 200 {object} models.User
func getUser(c *gin.Context) {
	var user = models.GetUser()
	c.JSON(200, user)
}
