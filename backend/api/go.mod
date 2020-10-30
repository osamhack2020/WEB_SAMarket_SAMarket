module api

go 1.15

require (
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/gin-gonic/gin v1.6.3
	golang.org/x/crypto v0.0.0-20201016220609-9e8e0b390897
	gopkg.in/guregu/null.v4 v4.0.0
	sam/config v0.0.0
	sam/middleware v0.0.0
	sam/models v0.0.0
	sam/ws v0.0.0
)

replace (
	sam/config v0.0.0 => ./../config
	sam/middleware v0.0.0 => ./../middleware
	sam/models v0.0.0 => ./../models
	sam/store v0.0.0 => ./../store
	sam/ws v0.0.0 => ./../ws
)
