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
		router.GET("/follow/:id", followUser)
		router.DELETE("/follow/:id", unFollowUser)
		router.GET("/follower/:id", getFollowerList)
		router.GET("/following/:id", getFollowingList)
		router.POST("/edit", editProfile)
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
// @Success 200 {object} UserProfileResult
// @Failure 400 {object} BadRequestResult
func getProfile(c *gin.Context) {
	// TODO 즐겨찾기 한 게시글, 리뷰 목록, 리뷰 점수 등 포함
	user := models.UserStore.GetUser(c.Param("id"))
	ResponseOK(c, user)
}

// followUser
// @Security ApiKeyAuth
// @Summary 해당 유저 팔로우
// @Description
// @name followUser
// @Accept  json
// @Produce  json
// @Param id path string true "유저 id"
// @Router /user/follow/{id} [get]
// @Success 200 {object} models.User
func followUser(c *gin.Context) {
	user := GetSessionUser(c)
	ft := models.UserStore.GetUser(c.Param("id"))
	models.UserStore.AddFollow(user.ID, ft.ID)
}

// unFollowUser
// @Security ApiKeyAuth
// @Summary 해당 유저 팔로우 취소
// @Description
// @name followUser
// @Accept  json
// @Produce  json
// @Param id path string true "유저 id"
// @Router /user/follow/{id} [delete]
// @Success 200 {object} models.User
func unFollowUser(c *gin.Context) {
	user := GetSessionUser(c)
	ft := models.UserStore.GetUser(c.Param("id"))
	models.UserStore.DeleteFollow(user.ID, ft.ID)
}

// getFollowList
// @Security ApiKeyAuth
// @Summary 해당 유저를 팔로우 한 사람들 보기
// @Description
// @name getFollowList
// @Accept json
// @Produce json
// @Param id path string true "유저 id"
// @router /user/follower/{id} [get]
// @Success 200 {object} []models.User
func getFollowerList(c *gin.Context) {
	user := models.UserStore.GetUser(c.Param("id"))
	ResponseOK(c, models.UserStore.GetFollowerList(*user))
}

// getFollowList
// @Security ApiKeyAuth
// @Summary 팔로우 한 리스트 보기
// @Description
// @name getFollowList
// @Accept json
// @Produce json
// @Param id path string true "유저 id"
// @router /user/following/{id} [get]
// @Success 200 {object} []models.User
func getFollowingList(c *gin.Context) {
	user := models.UserStore.GetUser(c.Param("id"))
	ResponseOK(c, models.UserStore.GetFollowingList(*user))
}

// editProfile
// @Security ApiKeyAuth
// @Summary 프로필 수정하기 (미구현)
// @Description 프로필 수정하기
// @name editProfile
// @Accept json
// @Param payload body models.User true "수정된 유저정보"
// @Produce json
// @router /user/edit [post]
func editProfile(c *gin.Context) {
	user := GetSessionUser(c)
	var editedUser models.User
	c.ShouldBindJSON(&editedUser)
	if editedUser.ID != user.ID {
		ResponseBadRequest(c, "어딜")
		return
	}
	models.UserStore.UpdateUser(editedUser)
}
