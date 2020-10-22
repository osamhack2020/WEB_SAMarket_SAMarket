package api

import (
	"sam/models"

	"github.com/gin-gonic/gin"
)

func InitReviewRouter(rg *gin.RouterGroup) {
	router := rg.Group("/review")
	{
		router.POST("/add", addReview)
		router.GET("/list/by/:userid", getReviewListBy)
		router.GET("/list/to/:userid", getReviewListTo)
		router.GET("/list/post/:userid", getReviewPostList)
	}
}

// addReview godoc
// @Security ApiKeyAuth
// @Summary 판매 채팅후기 남기기 (판매자->구매자 또는 구매자->판매자 모두 가능)
// @Description
// @Accept  json
// @Produce  json
// @Param payload body models.Review true "리뷰"
// @Router /review/add [post]
// @Success 200 {object} []models.ChatRoom
// @Failure 400 {object} BadRequestResult
func addReview(c *gin.Context) {
	var review models.Review
	c.ShouldBindJSON(&review)
	models.ReviewStore.AddReview(review)
}

// getReviewList godoc
// @Security ApiKeyAuth
// @Summary 유저가 쓴 리뷰 가져오기
// @Description
// @Accept  json
// @Produce  json
// @Param userid path string true "유저 id"
// @Router /review/list/to/{userid} [get]
// @Success 200 {object} []models.Review
// @Failure 400 {object} BadRequestResult
func getReviewListBy(c *gin.Context) {
	user := GetSessionUser(c)
	ResponseOK(c, models.ReviewStore.GetReviewsByWriterID(user.ID))
}

// getReviewList godoc
// @Security ApiKeyAuth
// @Summary 유저에 대한 리뷰 가져오기
// @Description
// @Accept  json
// @Produce  json
// @Param userid path string true "유저 id"
// @Router /review/list/by/{userid} [get]
// @Success 200 {object} []models.Review
// @Failure 400 {object} BadRequestResult
func getReviewListTo(c *gin.Context) {
	user := GetSessionUser(c)
	ResponseOK(c, models.ReviewStore.GetReviewsByTargetUserID(user.ID))
}

// getReviewPostList godoc
// @Security ApiKeyAuth
// @Summary 유저 리뷰 포스트 별로 전부 가져오기 (판매자일때 구매자일때 모두 가져옴)
// @Description
// @Accept json
// @Produce json
// @Param userid path string true "유저 id"
// @Router /review/list/post/{userid} [get]
// @Failure 400 {object} BadRequestResult
func getReviewPostList(c *gin.Context) {
	user := GetSessionUser(c)
	ResponseOK(c, models.ReviewStore.GetReviews(user.ID))
}
