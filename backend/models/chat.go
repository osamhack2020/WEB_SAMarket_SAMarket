package models

import (
	"time"
)

// 1:1 채팅
type ChatRoom struct {
	ID           int      `json:"id"`
	ModifiedDate time.Time `json:"modified_date"`
}

type ChatLog struct {
	ID           int
	ChatRoom     ChatRoom
	ChatRoomID   int
	Sender       User
	SenderID     string
	Readed       bool
	ModifiedDate time.Time `json:"modified_date"`
}

var ChatStore IChatStore

type IChatStore struct {
}

func (store IChatStore) AddChatLog(log ChatLog) {

}

func (store IChatStore) GetUnreadCount(userID string) int64 {
	var count int64
	db.Model(&ChatLog{}).Where("receiver_id = ? and readed = false", userID).Count(&count)
	return count
}
