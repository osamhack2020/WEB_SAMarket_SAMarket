package models

import (
	"time"

	"gopkg.in/guregu/null.v4"
)

type Comment struct {
	ID        int       `json:"id"`
	Post      Post      `json:"-"`
	PostID    int       `json:"post_id"`
	User      User      `json:"user"`
	UserID    string    `json:"-"`
	Content   string    `json:"content"`
	ToReply   *null.Int `json:"to_reply" swaggertype:"integer"`
	Replies   []Comment `json:"replies" gorm:"foreignkey:ToReply"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type ICommentStore struct{}

var CommentStore ICommentStore

func (store ICommentStore) AddComment(comment Comment) {
	db.Create(&comment)
}

func (store ICommentStore) DeleteComment() {

}

func (store ICommentStore) GetCommentList(postid int) []Comment {
	var comments []Comment
	db.Where("post_id = ? and to_reply IS NULL", postid).Preload("User").Preload("User.Unit").Preload("Replies").Preload("Replies.User").Find(&comments)
	return comments
}
