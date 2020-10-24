package models

import "time"

// https://gorm.io/docs/many_to_many.html

type Comment struct {
	ID        int       `json:"id"`
	Post      Post      `json:"-"`
	PostID    int       `json:"post_id"`
	User      User      `json:"user"`
	UserID    string    `json:"-"`
	Content   string    `json:"content"`
	ToReply   *int      `json:"to_reply"`
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
	db.Where("post_id = ? and to_reply IS NULL", postid).Preload("User").Preload("User.Unit").Preload("Replies").Find(&comments)
	return comments
}
