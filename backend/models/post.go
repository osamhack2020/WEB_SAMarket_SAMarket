package models

import "time"

type Post struct {
	ID        uint
	AuthorID  uint `json:"-"`
	Author    User
	Tags      string
	Title     string
	PostType  string
	Price     int
	Bgcolor   int
	UnitID    int  `json:"-"`
	Unit      Unit `json:"-"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type IPostStore struct{}

var PostStore IPostStore

func (store IPostStore) GetPostList(mil uint) {

}
