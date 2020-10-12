module sam/models

go 1.15

require (
	github.com/gin-gonic/gin v1.6.3
	gorm.io/driver/mysql v1.0.2
	gorm.io/gorm v1.20.2
	sam/config v0.0.0
)

replace sam/config v0.0.0 => ./../config
