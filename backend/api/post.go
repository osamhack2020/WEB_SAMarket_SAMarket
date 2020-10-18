package api

import (
	"github.com/gin-gonic/gin"
)

func InitPostRouter(rg *gin.RouterGroup) {
	router := rg.Group("/post")
	{
		router.POST("/add", addPost)
		router.GET("/list", getPostList)
		router.GET("/view/:id", getPost)
	}
}

// getPost godoc
// @Security ApiKeyAuth
// @Description 게시글 조회하기
// @Summary 게시글 조회하기
// @name getPost
// @Produce  json
// @Router /post/view/{id} [get]
// @Success 200 {object} []models.Post
func getPost(c *gin.Context) {

}

// getPostList godoc
// @Security ApiKeyAuth
// @Description 부대 게시글 목록 가져오기
// @Summary 부대 게시글 목록 가져오기
// @name getPostList
// @Produce  json
// @Router /post/list [get]
// @Success 200 {object} []models.Post
func getPostList(c *gin.Context) {

}

// addPost godoc
// @Security ApiKeyAuth
// @Description 게시글 올리기
// @Summary 게시글 올리기
// @name addPost
// @Produce  json
// @Router /post/add [post]
// @Success 200 {object} []models.Post
func addPost(c *gin.Context) {

}
