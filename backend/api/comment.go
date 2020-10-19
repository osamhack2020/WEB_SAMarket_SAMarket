package api

import (
	"sam/middleware"
	"sam/models"

	"strconv"

	"github.com/gin-gonic/gin"
)

func InitCommentRouter(rg *gin.RouterGroup) {
	router := rg.Group("/comment")
	{
		router.Use(middleware.TokenAuth)
		router.GET("/list/:postid", getCommentList)
		router.POST("/add", addComment)
	}
}

// getCommentList godoc
// @Security ApiKeyAuth
// @Description 게시글 댓글 가져오기
// @Summary 게시글 댓글 가져오기
// @name getCommentList
// @Produce  json
// @Param postid path string true "게시글 id"
// @Router /comment/list/{postid} [get]
// @Success 200 {object} []models.Unit
func getCommentList(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("postid"))
	c.JSON(200, models.CommentStore.GetCommentList(id))
}

// addComment godoc
// @Security ApiKeyAuth
// @Description 아래 예제에서 toReply (답글일 경우), postID (게시글 ID), content 만 넣어서 보내면 됨
// @Summary 댓글 추가
// @name addComment
// @Produce  json
// @Param payload body models.Comment true "댓글"
// @Router /comment/add [post]
// @Success 200 {object} []models.Unit
func addComment(c *gin.Context) {
	var comment *models.Comment
	c.ShouldBindJSON(&comment)
	val, _ := c.Get("user")
	if user, ok := val.(models.User); ok {
		comment.UserID = user.ID
	}
	models.CommentStore.AddComment(*comment)
}
