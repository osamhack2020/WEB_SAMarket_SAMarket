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
		router.GET("/rel/request/:userid", addRequest)
		router.GET("/rel/accept/:reqid", acceptRequest)
		router.GET("/rel/deny/:reqid", denyRequest)
		router.GET("/rel/reqlist", getRequestList)
		router.GET("/rel/list/:id", getRelation)
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

// @Security ApiKeyAuth
// @Summary 친구 요청하기
// @Description
// @name addRequest
// @Accept  json
// @Produce  json
// @Param id path string true "유저 id"
// @Router /user/rel/request/{userid} [post]
// @Success 200 {object} models.User
func addRequest(c *gin.Context) {

}

// @Security ApiKeyAuth
// @Summary 친구 요청 받기
// @Description
// @name acceptRequest
// @Accept  json
// @Produce  json
// @Param id path string true "유저 id"
// @Router /user/rel/accept/{reqid} [get]
// @Success 200 {object} models.User
func acceptRequest(c *gin.Context) {

}

// @Security ApiKeyAuth
// @Summary 친구 요청 거절하기
// @Description
// @name denyRequest
// @Accept  json
// @Produce  json
// @Param id path string true "유저 id"
// @Router /user/rel/deny/{reqid} [get]
// @Success 200 {object} models.User
func denyRequest(c *gin.Context) {

}

// @Security ApiKeyAuth
// @Summary 친구 요청 목록 가져오기
// @Description
// @name getRequestList
// @Accept  json
// @Produce  json
// @Router /user/rel/reqlist [get]
// @Success 200 {object} models.User
func getRequestList(c *gin.Context) {

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
