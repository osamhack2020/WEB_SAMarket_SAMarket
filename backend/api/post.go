package api

import (
    "github.com/gin-gonic/gin"
)

func InitPost(rg *gin.RouterGroup) {
    router := rg.Group("/post")
	router.GET("/post", test)
}

func test(c *gin.Context) {
	c.JSON(200, gin.H {
		"message": "hello",
	})
}