package api

import (
	"github.com/gin-gonic/gin"
)

func SetupAPI(r *gin.Engine) {
	v1 := r.Group("/api/")
	{
		InitUserRouter(v1)
		InitAuthRouter(v1)
		InitUnitRouter(v1)
		InitPostRouter(v1)
		InitCommentRouter(v1)
		InitUploadRouter(v1)
		InitErrorRouter(v1)
	}
}
