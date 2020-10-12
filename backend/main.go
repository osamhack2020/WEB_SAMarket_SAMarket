package main

import (
	"fmt"
	"sam/api"
	"sam/config"
	"sam/docs"
	"sam/models"

	_ "github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/static"
	_ "github.com/gin-gonic/autotls"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func main() {
	config.Init()
	models.Init()

	gin.SetMode(config.Settings.Server.Mode)
	r := gin.Default()
	api.SetupAPI(r)

	docs.SwaggerInfo.BasePath = "/api/"

	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.Run(fmt.Sprintf(":%s", config.Settings.Server.Port))
}
