package models

type UserRelation struct {
	First    User
	Second   User
	FirstID  string `gorm:"primaryKey;autoIncrement:false"`
	SecondID string `gorm:"primaryKey;autoIncrement:false"`
}
