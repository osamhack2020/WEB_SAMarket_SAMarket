package api

import "sam/models"

type BadRequestResult struct {
	MSG string `json:"msg"`
}

/* Auth Result Models */
type LoginResult struct {
	// 유저 정보
	User models.User `json:"user"`
	// 안 읽은 채팅 수
	UnreadChat int64 `json:"unread"`
}

/* Chat Result Models */

type ChatMsgsResult struct {
	ChatRoom models.ChatRoom  `json:"chat_room"`
	ChatMsgs []models.ChatMsg `json:"msgs"`
}

/* Comment Result Models */

/* Post Result Models */
/* Review Result Models */
/* Unit Result Models */
/* User Result Models */
type UserProfileResult struct {
	User  models.User `json:"user"`
	Score float32     `json:"score"`
}
