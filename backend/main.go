package main

import (
	"sam/api"
	"sam/docs"
	"sam/models"

	_ "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func main() {
	models.Init()

	r := gin.Default()
	api.SetupAPI(r)

	docs.SwaggerInfo.BasePath = "/api/v1"

	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.Run()
}
