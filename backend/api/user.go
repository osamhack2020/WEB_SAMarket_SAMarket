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
		router.GET("/profile/:id", getProfile)
	}
}

// getProfile godoc
// @Security ApiKeyAuth
// @Summary 해당 유저 프로파일 조회
// @Description
// @name getUser
// @Accept  json
// @Produce  json
// @Param id path string true "유저 id"
// @Router /user/profile/{id} [get]
// @Success 200 {object} models.User
func getProfile(c *gin.Context) {
	user := models.GetUserProfile(c.Param("id"))
	c.JSON(200, user)
}
