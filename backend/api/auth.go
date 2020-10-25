package api

import (
	"fmt"

	"sam/middleware"
	"sam/models"

	"github.com/gin-gonic/gin"
)

func InitAuthRouter(rg *gin.RouterGroup) {
	router := rg.Group("/auth")
	{
		router.POST("/login", login)
		router.GET("/logout", logout)
		router.POST("/register", register)
		router.Use(middleware.TokenAuth)
		router.GET("/session", checkSession)
	}
}

// login godoc
// @Summary 로그인
// @ID login
// @name Login
// @Accept  json
// @Produce  json
// @Param payload body LoginRequest true "로그인 정보"
// @Router /auth/login [post]
// @Success 200 {object} LoginResult
// @Failure 400 {object} BadRequestResult
func login(c *gin.Context) {
	var rq *LoginRequest
	err := c.ShouldBindJSON(&rq)
	if err != nil {
		fmt.Println(err)
	}
	user := models.UserStore.GetUserByIDAndPW(rq.LoginID, rq.Password)
	if user == nil {
		ResponseBadRequest(c, "해당 정보와 일치하는 유저를 찾을 수 없습니다.")
	} else {
		result := &LoginResult{*user, models.ChatStore.GetUnreadCount(user.ID)}
		middleware.GenerateToken(user, c)
		ResponseOK(c, result)
	}
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
	//토큰 쿠키 expire
	c.SetCookie("token", "", 0, "", "", false, false)
	ResponseOK(c, gin.H{"msg": "로그아웃 완료"})
}

// register godoc
// @Summary 회원가입
// @Description 회원가입, 비밀번호는 sha256 + salt("samarket")
// @Description id, unit 제외하고 보낼것
// @ID register
// @name register
// @Accept  json
// @Produce  json
// @Param json body RegisterRequest true "회원가입 정보"
// @Router /auth/register [post]
// @Success 200 {object} models.User
// @Failure 400 {object} BadRequestResult
func register(c *gin.Context) {
	var rq RegisterRequest
	err := c.ShouldBindJSON(&rq)
	if err != nil {
		fmt.Println(err)
	}
	user := models.User{LoginID: rq.LoginID, Name: rq.Name, Password: rq.Password, Mil: rq.Mil, UnitID: rq.UnitID, Rank: rq.Rank}
	err = models.UserStore.AddUser(user)
	if err != nil {
		ResponseBadRequest(c, err)
	} else {
		ResponseOK(c, user)
	}
}

// checkSession godoc
// @Security ApiKeyAuth
// @Summary 세션 체크
// @Description 세션 체크
// @Router /auth/session [get]
// @Success 200 {object} models.User
// @Failure 400 {object} BadRequestResult
func checkSession(c *gin.Context) {
	user := GetSessionUser(c)
	result := &LoginResult{user, models.ChatStore.GetUnreadCount(user.ID)}
	ResponseOK(c, result)
}
