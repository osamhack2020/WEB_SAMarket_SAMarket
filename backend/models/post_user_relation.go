package models

type PostUserRelation struct {
	User   User
	Post   Post
	UserID string `gorm:"primaryKey;autoIncrement:false"`
	PostID int    `gorm:"primaryKey;autoIncrement:false"`
	// block = 0, favor = 1
	Type int
}
