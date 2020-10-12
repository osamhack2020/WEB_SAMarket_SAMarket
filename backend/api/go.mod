module api

go 1.15

require (
    github.com/gin-gonic/gin v1.6.3
    sam/config v0.0.0
    sam/models v0.0.0
)

replace (
	sam/config v0.0.0 => ./../config
    sam/models v0.0.0 => ./../models
)