package models

import "time"

// https://gorm.io/docs/many_to_many.html

type Comment struct {
	ID        uint
	Post      Post `json:"-"`
	PostID    uint `json:"-"`
	User      User
	UserID    uint
	CreatedAt time.Time
	Reply     []Reply `gorm:"many2many:comment_replies;"`
}

type Reply struct {
	ID        uint
	CommentID uint `gorm:"TYPE:integer REFERENCES comments"`
	UserID    uint `json:"-"`
	User      User
	Content   string
}

type ICommentStore struct{}

var CommentStore ICommentStore

func (store ICommentStore) addComment() {

}

// 실제로 지워지는 것이 아닌, 표시만 안되게
func (store ICommentStore) deleteComment() {

}

func (store ICommentStore) addReply() {

}

func (store ICommentStore) deleteReply() {

}

func (store ICommentStore) getCommentList() {

}
