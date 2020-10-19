package models

type PostUserRelation struct {
	User   User
	Post   Post
	UserID string `gorm:"primaryKey;autoIncrement:false"`
	PostID int    `gorm:"primaryKey;autoIncrement:false"`
}
