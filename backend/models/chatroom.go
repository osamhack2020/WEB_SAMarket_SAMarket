package models

import (
	"time"
)

type ChatRoom struct {
	Id           uint `json:"id"`
	Seller       User `json:"seller"`
	SellerId     uint
	Buyer        User `json:"buyer"`
	BuyerId      uint
	ModifiedDate time.Time `json:"modified_date"`
}
