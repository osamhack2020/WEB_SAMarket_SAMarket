package models

type Comment struct {
	Id      uint
	Post    Post
	PostId  uint
	User    User
	UserId  uint
	ReplyId uint `gorm:"TYPE:integer REFERENCES comments"`
}
