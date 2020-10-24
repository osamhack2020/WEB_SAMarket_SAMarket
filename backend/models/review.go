package models

import "time"

type Review struct {
	ID           int
	Post         Post
	PostID       int
	Content      string
	Point        float32
	Writer       User
	WriterID     string
	TargetUser   User
	TargetUserID string
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

func (store IReviewStore) GetAverageScore(userID string) float32 {
	var score float32
	db.Raw("select avg(point) from reviews where review.target_user_id = ?", userID).Scan(&score)
	return score
}
