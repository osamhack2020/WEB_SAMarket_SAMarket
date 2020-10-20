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
	Users     []*User `gorm:"many2many:user_chatrooms;"`
}

type ChatMsg struct {
	ID         int
	ChatRoom   ChatRoom `json:"-"`
	ChatRoomID int
	Sender     User
	SenderID   string
	Content    string
	CreatedAt  time.Time
	Unread     int
}

var ChatStore IChatStore

type IChatStore struct {
}

func (store IChatStore) GetChatRoomsByUser(user User) []ChatRoom {
	var chatRooms []ChatRoom
	db.Model(&user).Association("ChatRooms").Find(&chatRooms)
	for idx := range chatRooms {
		db.Model(&chatRooms[idx]).Association("Users").Find(&chatRooms[idx].Users)
	}
	return chatRooms
}

func (store IChatStore) GetUsersInChatRoom(chatRoom ChatRoom) []User {
	var users []User
	db.Model(&chatRoom).Association("Users").Find(&users)
	return users
}

func (store IChatStore) AddChatRoom(chatroom *ChatRoom) {
	db.Create(chatroom)
}

func (store IChatStore) AddChatMsg(msg ChatMsg) {
	db.Create(&msg)
}

func (store IChatStore) CheckChatRoomExists(postID int, userID string) int64 {
	var count int64
	db.Raw("select COUNT(chat_rooms.id) from chat_rooms, user_chatrooms where chat_rooms.post_id = ? and chat_rooms.id = user_chatrooms.chat_room_id and user_chatrooms.user_id = ?", postID, userID).Scan(&count)
	return count
}

func (store IChatStore) AddUserInChatRoom(chatRoomID int, uuid string) {
	db.Exec("insert into user_chatrooms VALUES(?, ?)", chatRoomID, uuid)
}

func (store IChatStore) GetChatMsgList(chatRoomID int) []ChatMsg {
	var msgs []ChatMsg
	db.Where("chat_room_id = ?", chatRoomID).Preload("Sender").Find(&msgs)
	return msgs
}

func (store IChatStore) GetUnreadCount(userID string) int64 {
	var count int64
	db.Model(&ChatMsg{}).Where("receiver_id = ? and readed = false", userID).Count(&count)
	return count
}
