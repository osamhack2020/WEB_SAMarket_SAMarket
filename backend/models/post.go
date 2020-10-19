package models

import "time"

type Post struct {
	ID        int
	AuthorID  string `json:"-"`
	Author    User
	Tags      string
	Title     string
	Type      string
	Content   string
	Price     int
	FontColor string
	BgColor   string
	TagColor  string
	UnitID    int  `json:"-"`
	Unit      Unit `json:"-"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type IPostStore struct{}

var PostStore IPostStore

func (store IPostStore) AddPost(post Post) {
	db.Create(&post)
}

func (store IPostStore) GetPostList(unitID int) []Post {
	var posts []Post
	db.Where("unit_id = ?", unitID).Preload("Author").Find(&posts)
	return posts
}
