package middleware

import (
	"time"

	"net/http"
	"sam/config"
	"sam/models"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Claim struct {
	LoginID  string
	Password string
	jwt.StandardClaims
}

func EnableCORS(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "http://nanofiber.org:8081")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, Set-Cookie")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
	c.Next()
}

func GenerateToken(user *models.User, c *gin.Context) {
	expiration := time.Now().Add(48 * time.Hour)
	claim := &Claim{
		LoginID:  user.LoginID,
		Password: user.Password,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expiration.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	tokenString, _ := token.SignedString(config.Settings.Key.JWTBytes)
	c.SetCookie("token", tokenString, 60*60*24*2, "", "", false, false)
}

func TokenAuth(c *gin.Context) {
	cookie, err := c.Request.Cookie("token")
	if err != nil {
		redirectToMain(c)
		return
	}
	claim := &Claim{}
	token := cookie.Value
	_, err = jwt.ParseWithClaims(token, claim, func(token *jwt.Token) (interface{}, error) {
		return config.Settings.Key.JWTBytes, nil
	})
	user := models.UserStore.GetUserByIDAndPW(claim.LoginID, claim.Password)
	if user != nil {
		c.Set("user", *user)
	}
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			// jwt 토큰 에러 세션 만료
			redirectToMain(c)
			return
		}
		// 에러
		redirectToMain(c)
		return
	}
}

func redirectToMain(c *gin.Context) {
	c.Status(http.StatusUnauthorized)
	c.Abort()
}
