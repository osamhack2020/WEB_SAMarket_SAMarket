package models

import (
	"time"
)

type Noti struct {
	User       User
	UserID     string
	NotiUser   User
	NotiUserID string
	Content    string
	Action     string
	CreatedAt  time.Time
}
