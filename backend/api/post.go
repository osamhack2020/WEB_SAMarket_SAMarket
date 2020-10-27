package api

import (
	"sam/middleware"
	"sam/models"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func InitPostRouter(rg *gin.RouterGroup) {
	router := rg.Group("/post")
	{
		router.Use(middleware.TokenAuth)
		router.POST("/add", addPost)
		router.GET("/list", getPostList)
		router.GET("/list/:type", getPostListByType)
		router.GET("/user/:userid", getPostByAuthor)
		router.GET("/view/:id", getPost)
		router.GET("/favorite/:id", addFavorite)
		router.DELETE("/favorite/:id", deleteFavorite)
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
	posts := models.PostStore.GetPostListByUnitID(user.ID, user.UnitID)
	for i := range posts {
		if len(posts[i].Tags) > 0 {
			posts[i].TagsArray = strings.Split(posts[i].Tags, ",")
		}
	}
	ResponseOK(c, posts)
}

// getPost godoc
// @Security ApiKeyAuth
// @Description 게시글 목록 가져오기
// @Summary 게시글 목록 가져오기
// @name getPost
// @Produce  json
// @Router /post/view/{id} [get]
// @Success 200 {object} models.Post
// @Failure 400 {object} BadRequestResult
func getPost(c *gin.Context) {
	param := c.Param("id")
	postID, _ := strconv.Atoi(param)
	user := GetSessionUser(c)
	post := models.PostStore.GetPostWithFavorite(user.ID, postID)
	if len(post.Tags) > 0 {
		post.TagsArray = strings.Split(post.Tags, ",")
	}
	ResponseOK(c, post)
}

// getPostListByType godoc
// @Security ApiKeyAuth
// @Description 부대 게시글 목록 종류별로 가져오기
// @Summary 부대 게시글 목록 종류별로 가져오기
// @name getPostList
// @Produce  json
// @Param type path string true "게시글 종류"
// @Router /post/list/{type} [get]
// @Success 200 {object} []models.Post
// @Failure 400 {object} BadRequestResult
func getPostListByType(c *gin.Context) {
	postType := c.Param("type")
	user := GetSessionUser(c)
	posts := models.PostStore.GetPostListByTypeAndUnitID(user.ID, user.UnitID, postType)
	for i := range posts {
		if len(posts[i].Tags) > 0 {
			posts[i].TagsArray = strings.Split(posts[i].Tags, ",")
		}
	}
	ResponseOK(c, posts)
}

// addPost godoc
// @Security ApiKeyAuth
// @Description 게시글 올리기
// @Summary 게시글 올리기
// @name addPost
// @Produce  json
// @Param payload body AddPostRequest true "게시글"
// @Router /post/add [post]
// @Success 200 {object} models.Post
// @Failure 400 {object} BadRequestResult
func addPost(c *gin.Context) {
	var rq AddPostRequest
	c.ShouldBindJSON(&rq)
	var post models.Post
	post.Title = rq.Title
	post.Content = rq.Content
	post.Type = rq.PostType
	post.Clr = rq.Clr
	post.Tags = strings.Join(rq.Tags[:], ",")

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
// @Router /post/favorite/{id} [get]
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
// @Router /post/favorite/{id} [delete]
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
	posts := models.PostStore.GetFavorites(user)
	for i := range posts {
		if len(posts[i].Tags) > 0 {
			posts[i].TagsArray = strings.Split(posts[i].Tags, ",")
		}
	}
	ResponseOK(c, posts)
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
	posts := models.PostStore.GetPostListByAuthor(user.ID, author)
	for i := range posts {
		if len(posts[i].Tags) > 0 {
			posts[i].TagsArray = strings.Split(posts[i].Tags, ",")
		}
	}
	ResponseOK(c, posts)
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
