package main

import (
	"fmt"
	"net/http"
	"sam/api"
	"sam/config"
	"sam/docs"
	"sam/models"
	"sam/ws"

	"github.com/gin-contrib/cors"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/autotls"
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

	if config.Settings.Server.Mode == "debug" {
		corsc := cors.DefaultConfig()
		corsc.AllowOrigins = []string{"http://nanofiber.org:8081", "http://nanofiber.org:8082", "http://samarket.kr"}
		corsc.AllowCredentials = true
		r.Use(cors.New(corsc))
	}

	// Debug only
	api.SetupAPI(r)
	ws.SetupWebSocket(r)
	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	r.Use(static.Serve("/assets", static.LocalFile("./assets", true)))
	r.Use(static.Serve("/upload", static.LocalFile("./upload", true)))
	r.NoRoute(func(c *gin.Context) {
		c.File("./web/index.html")
	})

	if config.Settings.Server.Mode == "debug" {
		docs.SwaggerInfo.BasePath = "/api/"
		r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}

	if config.Settings.Server.HTTPS == "true" {
		httpRouter := gin.Default()
		httpRouter.GET("/*path", func(c *gin.Context) {
			c.Redirect(302, "https://"+config.Settings.Server.Domain+"/"+c.Param("path"))
		})
		httpRouter.Run(":80")
		autotls.Run(r, config.Settings.Server.Domain)
	} else {
		r.Run(fmt.Sprintf(":%s", config.Settings.Server.Port))
	}
}
