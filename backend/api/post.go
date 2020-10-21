package api

import (
	"sam/middleware"
	"sam/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func InitPostRouter(rg *gin.RouterGroup) {
	router := rg.Group("/post")
	{
		router.Use(middleware.TokenAuth)
		router.POST("/add", addPost)
		router.GET("/list", getPostList)
		//router.GET("/view/:id", getPost)
		router.GET("/toggle/favorite/:id", addFavorite)
		router.DELETE("/toggle/favorite/:id", deleteFavorite)
		router.GET("/favorites", getFavorites)
		router.POST("/search", searchPosts)
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
		// TODO 즐겨찾기 여부 JOIN
		c.JSON(200, models.PostStore.GetPostListByUnitID(user.ID, user.UnitID))
	}
}

type AddPostRequest struct {
	Title    string
	PostType string
	Tags     string
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
	var post models.Post
	c.ShouldBindJSON(&post)
	val, _ := c.Get("user")
	if user, ok := val.(models.User); ok {
		post.AuthorID = user.ID
		post.UnitID = user.UnitID
	}
	models.PostStore.AddPost(post)
}

// @Security ApiKeyAuth
// @Description 즐겨찾기에 추가
// @Summary 즐겨찾기에 추가
// @name addFavorite
// @Produce  json
// @Param id path string true "게시글 id"
// @Router /post/toggle/favorite/{id} [get]
// @Success 200 {object} []models.Post
func addFavorite(c *gin.Context) {
	val, _ := c.Get("user")
	user, _ := val.(models.User)

	param := c.Param("id")
	postID, _ := strconv.Atoi(param)
	models.PostStore.AddFavorite(user.ID, postID)
}

// @Security ApiKeyAuth
// @Description 즐겨찾기에서 삭제
// @Summary 즐겨찾기에서 삭제
// @name deleteFavorite
// @Produce  json
// @Param id path string true "게시글 id"
// @Router /post/toggle/favorite/{id} [delete]
// @Success 200 {object} []models.Post
func deleteFavorite(c *gin.Context) {
	val, _ := c.Get("user")
	user, _ := val.(models.User)

	param := c.Param("id")
	postID, _ := strconv.Atoi(param)
	models.PostStore.DeleteFavorite(user.ID, postID)
}

// @Security ApiKeyAuth
// @Description 안보이게 하기 여부 토글
// @Summary 안보이게 하기 여부 토글
// @name getPost
// @Produce  json
// @Router /post/toggle/ban/{id} [get]
// @Success 200 {object} []models.Post
func toggleBan(c *gin.Context) {

}

// @Security ApiKeyAuth
// @Description 즐겨찾기 누른 게시글 리스트
// @Summary 즐겨찾기 누른 게시글 리스트
// @name getPost
// @Produce  json
// @Router /post/favorites [get]
// @Success 200 {object} []models.Post
func getFavorites(c *gin.Context) {
	val, _ := c.Get("user")
	user, _ := val.(models.User)
	c.JSON(200, models.PostStore.GetFavorites(user))
}

// @Security ApiKeyAuth
// @Description 키워드로 게시글 검색
// @Summary 키워드로 게시글 검색 (미구현)
// @name searchPosts
// @Produce  json
// @Router /post/search [post]
// @Success 200 {object} []models.Post
func searchPosts(c *gin.Context) {

}
