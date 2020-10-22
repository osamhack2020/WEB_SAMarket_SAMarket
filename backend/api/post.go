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
		router.GET("/user/:userid", getPostByAuthor)
		//router.GET("/view/:id", getPost)
		router.GET("/toggle/favorite/:id", addFavorite)
		router.DELETE("/toggle/favorite/:id", deleteFavorite)
		router.GET("/notint/:id", notint)
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
// @Failure 400 {object} BadRequestResult
func getPostList(c *gin.Context) {
	user := GetSessionUser(c)
	ResponseOK(c, models.PostStore.GetPostListByUnitID(user.ID, user.UnitID))
}

// addPost godoc
// @Security ApiKeyAuth
// @Description 게시글 올리기
// @Summary 게시글 올리기
// @name addPost
// @Produce  json
// @Param payload body models.Post true "게시글"
// @Router /post/add [post]
// @Success 200 {object} models.Post
// @Failure 400 {object} BadRequestResult
func addPost(c *gin.Context) {
	var post models.Post
	c.ShouldBindJSON(&post)
	user := GetSessionUser(c)
	post.AuthorID = user.ID
	post.UnitID = user.UnitID
	models.PostStore.AddPost(post)
	ResponseOK(c, post)
}

// @Security ApiKeyAuth
// @Description 즐겨찾기에 추가
// @Summary 즐겨찾기에 추가
// @name addFavorite
// @Produce  json
// @Param id path string true "게시글 id"
// @Router /post/toggle/favorite/{id} [get]
// @Success 200
// @Failure 400 {object} BadRequestResult
func addFavorite(c *gin.Context) {
	user := GetSessionUser(c)

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
// @Success 200
// @Failure 400 {object} BadRequestResult
func deleteFavorite(c *gin.Context) {
	user := GetSessionUser(c)

	param := c.Param("id")
	postID, _ := strconv.Atoi(param)
	models.PostStore.DeleteFavorite(user.ID, postID)
}

// @Security ApiKeyAuth
// @Description 즐겨찾기 누른 게시글 리스트
// @Summary 즐겨찾기 누른 게시글 리스트
// @name getPost
// @Produce  json
// @Router /post/favorites [get]
// @Success 200 {object} []models.Post
// @Failure 400 {object} BadRequestResult
func getFavorites(c *gin.Context) {
	user := GetSessionUser(c)
	ResponseOK(c, models.PostStore.GetFavorites(user))
}

// @Security ApiKeyAuth
// @Description 유저가 쓴 게시글 가져오기
// @Summary 유저가 쓴 게시글 가져오기
// @name getPostByAuthor
// @Produce  json
// @Param userid path string true "유저 id"
// @Router /post/user/{userid} [get]
// @Success 200 {object} []models.Post
// @Failure 400 {object} BadRequestResult
func getPostByAuthor(c *gin.Context) {
	user := GetSessionUser(c)
	author := c.Param("userid")
	ResponseOK(c, models.PostStore.GetPostListByAuthor(user.ID, author))
}

// @Security ApiKeyAuth
// @Description 키워드로 게시글 검색
// @Summary 키워드로 게시글 검색 (미구현)
// @name searchPosts
// @Param query path string true "검색 쿼리"
// @Produce  json
// @Router /post/search/{query} [get]
// @Success 200 {object} []models.Post
// @Failure 400 {object} BadRequestResult
func searchPosts(c *gin.Context) {

}

// notint godoc
// @Security ApiKeyAuth
// @Description 관심없음 표시
// @Summary 관심없음 표시
// @name notint
// @Produce  json
// @Param id path string true "게시글 id"
// @Router /post/notint/{id} [get]
// @Success 200
// @Failure 400 {object} BadRequestResult
func notint(c *gin.Context) {

}
