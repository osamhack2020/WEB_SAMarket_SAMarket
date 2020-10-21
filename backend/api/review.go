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
func getReviewListBy(c *gin.Context) {
	val, _ := c.Get("user")
	user, _ := val.(models.User)
	c.JSON(200, models.ReviewStore.GetReviewsByWriterID(user.ID))
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
func getReviewListTo(c *gin.Context) {
	val, _ := c.Get("user")
	user, _ := val.(models.User)
	c.JSON(200, models.ReviewStore.GetReviewsByTargetUserID(user.ID))
}
