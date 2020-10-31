package models

import (
	"time"
)

type Noti struct {
	User       User      `json:"user"`
	UserID     string    `json:"user_id"`
	NotiUser   User      `json:"noti_user"`
	NotiUserID string    `json:"noti_user_id"`
	Content    string    `json:"content"`
	Action     string    `json:"action"`
	CreatedAt  time.Time `json:"created_at"`
}
