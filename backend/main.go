package main

import (
	"fmt"
	"net/http"
	"sam/api"
	"sam/config"
	"sam/docs"
	"sam/middleware"
	"sam/models"
	"sam/ws"

	"github.com/gin-contrib/static"
	_ "github.com/gin-gonic/autotls"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title SA Market
// @version 1.0

// @license.name MIT
// @license.url https://opensource.org/licenses/MIT

// @BasePath /api/
// @query.collection.format multi

var upGrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	config.Init()
	models.Init()
	redis.NewClient(&redis.Options{Addr: "localhost:6379"})

	gin.SetMode(config.Settings.Server.Mode)
	r := gin.Default()
	// Debug only
	if config.Settings.Server.Mode == "debug" {
		r.Use(middleware.EnableCORS)
	}
	api.SetupAPI(r)
	ws.SetupTest(r)
	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	r.NoRoute(func(c *gin.Context) {
		c.File("./web/index.html")
	})

	if config.Settings.Server.Mode == "debug" {
		docs.SwaggerInfo.BasePath = "/api/"
		r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}

	r.Run(fmt.Sprintf(":%s", config.Settings.Server.Port))
}
