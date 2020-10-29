package models

import (
	"fmt"
	"time"
)

type Review struct {
	ID           int
	Post         Post
	PostID       int `gorm:"index:post_writer,unique" json:"post_id"`
	Content      string
	Point        float32
	Writer       User
	WriterID     string `gorm:"index:post_writer,unique" json:"writer_id"`
	TargetUser   User
	TargetUserID string `json:"target_user_id"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type IReviewStore struct{}

var ReviewStore IReviewStore

func (store IReviewStore) AddReview(review Review) {
	db.Create(&review)
}

func (store IReviewStore) GetReviewsByTargetUserID(userID string) []Review {
	var reviewList []Review
	db.Where("target_user_id = ?", userID).Find(&reviewList)
	return reviewList
}

func (store IReviewStore) GetReviewsByWriterID(userID string) []Review {
	var reviewList []Review
	db.Where("writer_id = ?", userID).Find(&reviewList)
	return reviewList
}

func (store IReviewStore) GetReviews(userID string) []Review {
	var reviewList []Review
	db.Where("writer_id = ? or target_user_id = ? order by created_at desc", userID).Find(&reviewList)
	return reviewList
}

func (store IReviewStore) GetReviewScore(userID string) float32 {
	var avg float32
	db.Raw("select avg(point) from reviews where target_user_id = ?", userID).Scan(&avg)
	return avg
}
func (store IReviewStore) GetAverageScore(userID string) float32 {
	var score float32
	db.Raw("select avg(point) from reviews where review.target_user_id = ?", userID).Scan(&score)
	return score
}

func (store IReviewStore) GetCanWriteReview(userID string, chatRoomID int) bool {
	var count int64
	db.Raw("select count(reviews.id) from chat_rooms, reviews where chat_rooms.id = ? and chat_rooms.post_id = reviews.post_id and writer_id = ?", chatRoomID, userID).Scan(&count)
	fmt.Println(count)
	return count == 0
}
