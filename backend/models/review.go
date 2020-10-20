package models

type Review struct {
	ID           int
	Content      string
	Point        float32
	Writer       User
	WriterID     string
	TargetUser   User
	TargetUserID string
}
