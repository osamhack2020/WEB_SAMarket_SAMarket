module sam

go 1.15

require (
	github.com/alecthomas/template v0.0.0-20190718012654-fb15b899a751
	github.com/cpuguy83/go-md2man/v2 v2.0.0 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/gin-contrib/static v0.0.0-20200916080430-d45d9a37d28e
	github.com/gin-gonic/autotls v0.0.3
	github.com/gin-gonic/gin v1.6.3
	github.com/go-openapi/spec v0.19.9 // indirect
	github.com/go-openapi/swag v0.19.9 // indirect
	github.com/go-playground/validator/v10 v10.4.0 // indirect
	github.com/go-redis/redis/v8 v8.3.1
	github.com/go-sql-driver/mysql v1.5.0
	github.com/golang/protobuf v1.4.2 // indirect
	github.com/gorilla/websocket v1.4.2
	github.com/json-iterator/go v1.1.10 // indirect
	github.com/mailru/easyjson v0.7.6 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.1 // indirect
	github.com/swaggo/files v0.0.0-20190704085106-630677cd5c14
	github.com/swaggo/gin-swagger v1.2.0
	github.com/swaggo/swag v1.6.7
	github.com/ugorji/go v1.1.11 // indirect
	github.com/urfave/cli/v2 v2.2.0 // indirect
	golang.org/x/crypto v0.0.0-20201002170205-7f63de1d35b0
	golang.org/x/net v0.0.0-20201010224723-4f7140c49acb // indirect
	golang.org/x/sys v0.0.0-20201009025420-dfb3f7c4e634 // indirect
	golang.org/x/tools v0.0.0-20201011145850-ed2f50202694 // indirect
	google.golang.org/protobuf v1.25.0 // indirect
	gopkg.in/dgrijalva/jwt-go.v3 v3.2.0 // indirect
	gopkg.in/yaml.v2 v2.3.0 // indirect
	gorm.io/driver/mysql v1.0.2
	gorm.io/driver/sqlite v1.1.3 // indirect
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
