package models

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
