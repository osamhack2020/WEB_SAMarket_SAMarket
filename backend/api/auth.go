package api

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Claim struct {
	Id uint
	jwt.StandardClaims
}

func InitAuthRouter(rg *gin.RouterGroup) {
	router := rg.Group("/auth")
	{
		router.POST("/login", login)
		router.GET("/logout", logout)
		router.GET("/testgen", testgen)
	}
}

// testgen godoc
// @Summary 토큰 발급 받기 (Debug API)
// @Description 토큰발급
// @name testgen
// @Accept  json
// @Produce  json
// @Router /auth/testgen [get]
// @Success 200 {object} models.User
func testgen(c *gin.Context) {
	expiration := time.Now().Add(120 * time.Hour)
	claim := &Claim{
		Id: 1,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expiration.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	tokenString, _ := token.SignedString([]byte("123123123"))
	c.SetCookie("token", tokenString, 1800, "", "", false, false)
	c.JSON(200, gin.H{
		"token": tokenString,
	})
}

// login godoc
// @Summary 로그인
// @Description 로그인
// @name Login
// @Accept  json
// @Produce  json
// @Router /auth/login [post]
// @Success 200 {object} models.User
func login(c *gin.Context) {

}

// logout godoc
// @Summary 로그아웃
// @Description 로그아웃
// @name Login
// @Accept  json
// @Produce  json
// @Router /auth/logout [get]
// @Success 200 {object} models.User
func logout(c *gin.Context) {

}

// 가입하기 (비번, 아디, 군번 등)
func register(c *gin.Context) {

}
