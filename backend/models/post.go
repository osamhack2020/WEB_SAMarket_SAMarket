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

func (store IPostStore) GetPost(postID int) Post {
	var post Post
	db.Where("id = ?", postID).Preload("Author").Find(&post)
	return post
}

func (store IPostStore) GetPostListByUnitID(unitID int) []Post {
	var posts []Post
	db.Order("created_at desc").Where("unit_id = ?", unitID).Preload("Author").Find(&posts)
	return posts
}

func (store IPostStore) GetFavorites(user User) []Post {
	var posts []Post
	db.Model(&user).Association("Favorites").Find(&posts)
	return posts
}

func (store IPostStore) AddFavorite(uuid string, postID int) {
	db.Exec("INSERT INTO favorites (user_id, post_id) VALUES (?, ?);", uuid, postID)
}

func (store IPostStore) DeleteFavorite(uuid string, postID int) {
	db.Exec("DELETE FROM favorites where user_id = ? and post_id = ?", uuid, postID)
}
