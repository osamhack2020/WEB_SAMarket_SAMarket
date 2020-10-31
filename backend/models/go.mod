module sam/models

go 1.15

require (
	github.com/fatih/set v0.2.1
	github.com/gin-gonic/gin v1.6.3
	github.com/satori/go.uuid v1.2.0
	gopkg.in/guregu/null.v4 v4.0.0
	gopkg.in/nullbio/null.v4 v4.0.0-20160904091851-593ba42ffa02
	gorm.io/driver/mysql v1.0.2
	gorm.io/gorm v1.20.2
	sam/config v0.0.0
)

replace sam/config v0.0.0 => ./../config
