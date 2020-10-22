package api

import (
	"sam/models"

	"github.com/gin-gonic/gin"
)

func InitUnitRouter(rg *gin.RouterGroup) {
	router := rg.Group("/unit")
	{
		router.GET("/list", getUnitList)
	}
}

// getUnitList godoc
// @Description 부대 리스트 가져오기 (mil 육군 = 1, 해군 = 2, 공군 = 3, 해병 = 4, 국직 = 5)
// @Summary 부대 리스트 가져오기
// @name getUnitList
// @Produce  json
// @Router /unit/list [get]
// @Success 200 {object} []models.Unit
func getUnitList(c *gin.Context) {
	ResponseOK(c, models.UnitStore.GetUnitList())
}
