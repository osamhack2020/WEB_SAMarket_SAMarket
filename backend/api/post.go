package api

import (
	"github.com/gin-gonic/gin"
)

func InitPostRouter(rg *gin.RouterGroup) {
	router := rg.Group("/post")
	router.GET("/post", test)
}

func test(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "hello",
	})
}

// 해당 유저가 쓴 글 조회 API
// 판매글 채팅방 열기 API

// 해당 부대 내 게시글 조회하기 API (order by date, pagination limit = 15)
