package models

import "time"

type Post struct {
	Id        uint
	AuthorId  uint
	Author    User
	Tags      string
	Title     string
	PostType  int
	Price     int
	Bgcolor   int
	UnitId    int
	Unit      Unit
	CreatedAt time.Time
	UpdatedAt time.Time
}
