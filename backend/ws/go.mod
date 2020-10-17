module ws

go 1.15

require (
	github.com/gin-gonic/gin v1.6.3
	github.com/gorilla/websocket v1.4.2
	sam/middleware v0.0.0
	sam/config v0.0.0
	sam/models v0.0.0
)

replace (
	sam/middleware v0.0.0 => ./../middleware
	sam/config v0.0.0 => ./../config
	sam/models v0.0.0 => ./../models
)
