package models

import (
	"time"
)

type PostColor struct {
	Font string `json:"font"`
	Back string `json:"back"`
	Tag  string `json:"tag"`
}

type Post struct {
	ID       int       `json:"id"`
	AuthorID string    `json:"-"`
	Author   User      `json:"author"`
	Tags     string    `json:"tags"`
	Title    string    `json:"title"`
	Type     string    `json:"type"`
	Content  string    `json:"content"`
	Sub      string    `json:"sub"`
	Clr      PostColor `json:"clr" gorm:"embedded;embeddedPrefix:clr_"`
	UnitID   int       `json:"-"`
	Unit     Unit      `json:"-"`
	// 판매 종료 완료
	Closed bool `json:"closed"`
	// TODO 컬럼 생성 방지
	IsFavorite int64     `json:"is_favorite"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
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

func (store IPostStore) GetPostListByUnitID(userID string, unitID int) []Post {
	var posts []Post
	db.Model(&Post{}).Raw("select posts.*, (f.post_id is NOT NULL) as is_favorite from posts LEFT OUTER JOIN favorites f ON f.user_id = ? and posts.id = f.post_id WHERE posts.unit_id = ? order by posts.created_at desc ", userID, unitID).Preload("Author").Find(&posts)
	//db.Order("created_at desc").Where("unit_id = ?", unitID).Preload("Author").Find(&posts)
	return posts
}

func (store IPostStore) GetPostListByTypeAndUnitID(userID string, unitID int, postType string) []Post {
	var posts []Post
	db.Model(&Post{}).Raw("select posts.*, (f.post_id is NOT NULL) as is_favorite from posts LEFT OUTER JOIN favorites f ON f.user_id = ? and posts.id = f.post_id WHERE posts.unit_id = ? and posts.type = ? order by posts.created_at desc ", userID, postType, unitID).Preload("Author").Find(&posts)
	//db.Order("created_at desc").Where("unit_id = ?", unitID).Preload("Author").Find(&posts)
	return posts
}

func (store IPostStore) GetPostListByAuthor(userID string, authorID string) []Post {
	var posts []Post
	db.Model(&Post{}).Raw("select posts.*, (f.post_id is NOT NULL) as is_favorite from posts LEFT OUTER JOIN favorites f ON f.user_id = ? and posts.id = f.post_id WHERE posts.author_id = ? order by posts.created_at desc ", userID, authorID).Preload("Author").Find(&posts)
	//db.Order("created_at desc").Where("unit_id = ?", unitID).Preload("Author").Find(&posts)
	return posts
}

func (store IPostStore) GetFavorites(user User) []Post {
	var posts []Post
	db.Model(&Post{}).Raw("select posts.*, (f.post_id is NOT NULL) as is_favorite from posts INNER JOIN favorites f ON f.user_id = ? and posts.id = f.post_id order by posts.created_at desc ", user.ID).Preload("Author").Find(&posts)
	return posts
}

func (store IPostStore) AddFavorite(uuid string, postID int) {
	db.Exec("INSERT INTO favorites (user_id, post_id) VALUES (?, ?);", uuid, postID)
}

func (store IPostStore) DeleteFavorite(uuid string, postID int) {
	db.Exec("DELETE FROM favorites where user_id = ? and post_id = ?", uuid, postID)
}
