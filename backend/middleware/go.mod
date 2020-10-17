module middleware

go 1.15

require (
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/gin-gonic/gin v1.6.3
	github.com/satori/go.uuid v1.2.0
	sam/config v0.0.0
	sam/models v0.0.0
)

replace (
	sam/config v0.0.0 => ../config
	sam/models v0.0.0 => ../models
)
