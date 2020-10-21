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
	Users     []*User  `gorm:"many2many:user_chatrooms;"`
	Unread    int      `gorm:"-"`
	LastMsg   *ChatMsg `gorm:"-"`
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
	// TODO 안읽은 메시지 수 가져오기
	for idx := range chatRooms {
		db.Model(&chatRooms[idx]).Association("Users").Find(&chatRooms[idx].Users)
		db.Raw("SELECT COUNT(*) from chat_msgs WHERE chat_room_id = ? and sender_id != ? and unread = 1", chatRooms[idx].ID, user.ID).Scan(&chatRooms[idx].Unread)
		chatRooms[idx].LastMsg = new(ChatMsg)
		db.Where("chat_room_id = ?", chatRooms[idx].ID).Order("created_at desc").Limit(1).Preload("Sender").Find(chatRooms[idx].LastMsg)
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
	db.Where("chat_room_id = ?", chatRoomID).Order("created_at asc").Preload("Sender").Find(&msgs)
	return msgs
}

func (store IChatStore) MakeRead(userID string, chatRoomID int) {
	db.Exec("UPDATE chat_msgs SET unread = 0 where chat_room_id = ? and sender_id != ?", chatRoomID, userID)
}

func (store IChatStore) GetUnreadCount(userID string) int64 {
	// TODO 총 안읽은 메시지 수 가져오기
	var count int64
	db.Raw("select count(*) from user_chatrooms, chat_rooms, chat_msgs where user_chatrooms.user_id = ? and user_chatrooms.chat_room_id = chat_rooms.id and chat_msgs.chat_room_id = chat_rooms.id and chat_msgs.sender_id != user_chatrooms.user_id and chat_msgs.unread = 1", userID).Scan(&count)
	return count
}
