module sam

go 1.15

require (
	github.com/alecthomas/template v0.0.0-20190718012654-fb15b899a751
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/gin-contrib/cors v1.3.1
	github.com/gin-contrib/static v0.0.0-20200916080430-d45d9a37d28e
	github.com/gin-gonic/autotls v0.0.3
	github.com/gin-gonic/gin v1.6.3
	github.com/go-redis/redis/v8 v8.3.1
	github.com/go-sql-driver/mysql v1.5.0
	github.com/gorilla/websocket v1.4.2
	github.com/swaggo/files v0.0.0-20190704085106-630677cd5c14
	github.com/swaggo/gin-swagger v1.2.0
	github.com/swaggo/swag v1.6.7
	github.com/unrolled/secure v1.0.8
	gorm.io/driver/mysql v1.0.2
	gorm.io/gorm v1.20.2
	sam/api v0.0.0
	sam/config v0.0.0
	sam/docs v0.0.0
	sam/middleware v0.0.0
	sam/models v0.0.0
	sam/ws v0.0.0
)

replace (
	sam/api v0.0.0 => ./api
	sam/config v0.0.0 => ./config
	sam/docs v0.0.0 => ./docs
	sam/middleware v0.0.0 => ./middleware
	sam/models v0.0.0 => ./models
	sam/ws v0.0.0 => ./ws
)
