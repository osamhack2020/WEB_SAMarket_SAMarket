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
		router.POST("/rel/:id", addRelation)
		router.GET("/rel/:id", getRelation)
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
	user := models.UserStore.GetUser(c.Param("id"))
	c.JSON(200, user)
}

// addRelation godoc
// @Security ApiKeyAuth
// @Summary 친구 등록
// @Description
// @name addRelation
// @Accept  json
// @Produce  json
// @Param id path string true "유저 id"
// @Router /user/rel/{id} [post]
// @Success 200 {object} models.User
func addRelation(c *gin.Context) {

}

// getRelation godoc
// @Security ApiKeyAuth
// @Summary 친구 목록 가져오기
// @Description
// @name addRelation
// @Accept  json
// @Produce  json
// @Param id path string true "유저 id"
// @Router /user/rel/{id} [get]
// @Success 200 {object} models.User
func getRelation(c *gin.Context) {

}
