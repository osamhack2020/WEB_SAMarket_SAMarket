package api

import (
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"sam/middleware"

	"github.com/gin-gonic/gin"
)

func InitUploadRouter(rg *gin.RouterGroup) {
	router := rg.Group("/upload")
	{
		router.Use(middleware.TokenAuth)
		router.POST("/", upload)
	}
}

// @Summary 이미지 파일 업로드
// @Security ApiKeyAuth
// @Description 이미지 파일 업로드
// @ID upload
// @Accept  multipart/form-data
// @Produce  json
// @Param   file formData file true  "this is a test file"
// @Success 200 {string} string "ok"
// @Failure 400 {object} string "We need ID!!"
// @Failure 404 {object} string "Can not find ID"
// @Router /upload [post]
func upload(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("get form err: %s", err.Error()))
		return
	}

	// TODO: file name randomization
	filename := filepath.Base(file.Filename)
	uploadPath := "./upload/" + filename
	log.Println(filename)
	if err := c.SaveUploadedFile(file, uploadPath); err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
		return
	}

	c.JSON(200, gin.H{
		"filename": file.Filename,
	})
}
