package api

import "sam/models"

// api results
type LoginResult struct {
	// 유저 정보
	User models.User
	// 안 읽은 채팅 수
	UnreadedChat int64
}
