package api

import (
	"fmt"
	"net/http"
	"sam/models"

	"github.com/gin-gonic/gin"
)

func GetSessionUser(c *gin.Context) models.User {
	val, _ := c.Get("user")
	user, _ := val.(models.User)
	return user
}

func ResponseOK(c *gin.Context, obj interface{}) {
	c.JSON(http.StatusOK, obj)
}

func ResponseUnauthorized(c *gin.Context, msg interface{}) {
	msgstr := fmt.Sprintf("%v", msg)
	c.JSON(http.StatusBadRequest, BadRequestResult{MSG: msgstr})
}

func ResponseBadRequest(c *gin.Context, msg interface{}) {
	msgstr := fmt.Sprintf("%v", msg)
	c.JSON(http.StatusBadRequest, BadRequestResult{MSG: msgstr})
}

func SetupAPI(r *gin.Engine) {
	v1 := r.Group("/api/")
	{
		InitUserRouter(v1)
		InitAuthRouter(v1)
		InitUnitRouter(v1)
		InitPostRouter(v1)
		InitCommentRouter(v1)
		InitChatRouter(v1)
		InitReviewRouter(v1)
		InitUploadRouter(v1)
		InitErrorRouter(v1)
	}
}
