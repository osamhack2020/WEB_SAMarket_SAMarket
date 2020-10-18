package api

import (
	"github.com/gin-gonic/gin"
)

func InitUploadRouter(rg *gin.RouterGroup) {
	router := rg.Group("/upload")
	{
		router.POST("/", upload)
	}
}

// upload godoc
// @Description 이미지 파일 업로드
// @Summary 이미지 파일 업로드
// @name upload
// @Produce  json
// @Router /upload [post]
// @Success 200 {object} []models.Unit
func upload(c *gin.Context) {

}
