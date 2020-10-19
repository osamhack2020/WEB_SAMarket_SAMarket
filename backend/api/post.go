package api

import (
	"sam/middleware"
	"sam/models"

	"github.com/gin-gonic/gin"
)

func InitPostRouter(rg *gin.RouterGroup) {
	router := rg.Group("/post")
	{
		router.Use(middleware.TokenAuth)
		router.POST("/add", addPost)
		router.GET("/list", getPostList)
		//router.GET("/view/:id", getPost)
		router.GET("/toggle/favorite/:id", toggleFavorite)
		router.GET("/toggle/ban/:id", toggleBan)
		router.GET("/favorites", getFavorites)
	}
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
	val, _ := c.Get("user")
	if user, ok := val.(models.User); ok {
		c.JSON(200, models.PostStore.GetPostList(user.UnitID))
	}
}

// addPost godoc
// @Security ApiKeyAuth
// @Description 게시글 올리기
// @Summary 게시글 올리기
// @name addPost
// @Produce  json
// @Param payload body models.Post true "게시글"
// @Router /post/add [post]
// @Success 200 {object} []models.Post
func addPost(c *gin.Context) {
	var post *models.Post
	c.ShouldBindJSON(&post)
	val, _ := c.Get("user")
	if user, ok := val.(models.User); ok {
		post.AuthorID = user.ID
		post.UnitID = user.UnitID
	}
	models.PostStore.AddPost(*post)
}

// @Security ApiKeyAuth
// @Description 즐겨찾기 여부 토글
// @Summary 즐겨찾기 여부 토글
// @name getPost
// @Produce  json
// @Router /toggle/favorite/{id} [get]
// @Success 200 {object} []models.Post
func toggleFavorite(c *gin.Context) {

}

// @Security ApiKeyAuth
// @Description 안보이게 하기 여부 토글
// @Summary 안보이게 하기 여부 토글
// @name getPost
// @Produce  json
// @Router /toggle/favorite/{id} [get]
// @Success 200 {object} []models.Post
func toggleBan(c *gin.Context) {

}

// @Security ApiKeyAuth
// @Description 즐겨찾기 누른 게시글 리스트
// @Summary 즐겨찾기 누른 게시글 리스트
// @name getPost
// @Produce  json
// @Router /toggle/favorite/{id} [get]
// @Success 200 {object} []models.Post
func getFavorites(c *gin.Context) {

}
