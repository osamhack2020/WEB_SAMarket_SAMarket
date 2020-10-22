package models

import "time"

// https://gorm.io/docs/many_to_many.html

type Comment struct {
	ID        int
	Post      Post `json:"-"`
	PostID    int
	User      User
	UserID    string `json:"-"`
	Content   string
	ToReply   *int
	Replies   []Comment `gorm:"foreignkey:ToReply"`
	CreatedAt time.Time
	UpdatedAt time.Time
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
	db.Where("post_id = ? and to_reply IS NULL", postid).Preload("User").Preload("User.Unit").Preload("Replies").Find(&comments)
	return comments
}
