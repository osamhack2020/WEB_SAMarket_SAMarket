package models

import (
	"time"
)

type ChatRoom struct {
	ID        int
	Post      Post
	PostID    int
	Title     string
	CreatedAt time.Time
	Users     []User `gorm:"many2many:user_chatrooms;"`
}

type ChatMsg struct {
	ID         int
	ChatRoom   ChatRoom
	ChatRoomID int
	Sender     User
	SenderID   string
	Content    string
	CreatedAt  time.Time
}

var ChatStore IChatStore

type IChatStore struct {
}

func (store IChatStore) AddChatMsg(msg ChatMsg) {
	db.Create(&msg)
}

func (store IChatStore) GetChatMsgList(chatRoomID int) []ChatMsg {
	var msgs []ChatMsg
	db.Where("chat_room_id = ?", chatRoomID).Find(&msgs)
	return msgs
}

func (store IChatStore) GetUnreadCount(userID string) int64 {
	var count int64
	db.Model(&ChatMsg{}).Where("receiver_id = ? and readed = false", userID).Count(&count)
	return count
}
