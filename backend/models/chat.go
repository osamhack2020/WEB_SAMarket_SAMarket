package models

import (
	"time"
)

// 1:1 채팅
type ChatRoom struct {
	Id           uint `json:"id"`
	Seller       User `json:"seller"`
	SellerId     uint
	Buyer        User `json:"buyer"`
	BuyerId      uint
	ModifiedDate time.Time `json:"modified_date"`
}

type ChatLog struct {
	Id           uint `json:"id"`
	Sender       User
	SenderId     uint
	content      string
	ChatRoom     ChatRoom
	ChatRoomId   uint
	ModifiedDate time.Time `json:"modified_date"`
}
