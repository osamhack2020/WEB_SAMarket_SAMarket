package api

import (
	"sam/models"

	"github.com/gin-gonic/gin"
)

func InitUserRouter(rg *gin.RouterGroup) {
	router := rg.Group("/user")
	router.GET("/test", getUser)
}

// @Summary 테스트 API
// @Description 테스트 APIAPI
// @name getUser
// @Accept  json
// @Produce  json
// @Router /user/test [get]
// @Success 200 {object} models.User
func getUser(c *gin.Context) {
	var user = models.GetUser()
	c.JSON(200, user)
}
