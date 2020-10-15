package middleware

import (
	"net/http"

	"sam/config"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Claim struct {
	Id uint
	jwt.StandardClaims
}

func TokenAuth(c *gin.Context) {
	cookie, err := c.Request.Cookie("token")
	if err != nil {
		c.JSON(401, gin.H{"message": "error"})
		c.Abort()
		return
	}
	claim := &Claim{}
	token := cookie.Value
	_, err = jwt.ParseWithClaims(token, claim, func(token *jwt.Token) (interface{}, error) {
		return config.Settings.Key.JWTBytes, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			c.JSON(http.StatusUnauthorized,
				gin.H{"goaway": "babo"},
			)
			c.Abort()
			return
		}
		c.JSON(http.StatusUnauthorized, gin.H{"error": "error"})
		c.Abort()
		return
	}
}
