package api

import (
	"github.com/gin-gonic/gin"
)

func InitCommentRouter(rg *gin.RouterGroup) {
	router := rg.Group("/comment")
	{
		router.GET("/list/:postid", getCommentList)
		router.POST("/:postid", addComment)
		router.POST("/reply/:commentid", addReply)
	}
}

// getCommentList godoc
// @Security ApiKeyAuth
// @Description 게시글 댓글 가져오기
// @Summary 게시글 댓글 가져오기
// @name getCommentList
// @Produce  json
// @Router /comment/list/{postid} [get]
// @Success 200 {object} []models.Unit
func getCommentList(c *gin.Context) {

}

// addComment godoc
// @Security ApiKeyAuth
// @Description 댓글 추가
// @Summary 댓글 추가
// @name addComment
// @Produce  json
// @Router /comment/{postid} [post]
// @Success 200 {object} []models.Unit
func addComment(c *gin.Context) {

}

// addReply godoc
// @Security ApiKeyAuth
// @Description 답글 추가
// @Summary 답글 추가
// @name addReply
// @Produce  json
// @Router /comment/reply/{commentid} [post]
// @Success 200 {object} []models.Unit
func addReply(c *gin.Context) {

}
