package models

import (
	"time"

	"gorm.io/gorm/clause"
)

type Review struct {
	ID           int     `json:"-"`
	Writer       User    `json:"writer"`
	WriterID     string  `gorm:"index:post_writer,unique" json:"writer_id"`
	Post         Post    `json:"-"`
	PostID       int     `gorm:"index:post_writer,unique" json:"post_id"`
	Content      string  `json:"content"`
	Point        float32 `json:"point"`
	TargetUser   User    `json:"-"`
	TargetUserID string  `json:"target_user_id"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type PR struct {
	Post      Post   `json:"post" gorm:"embedded;embeddedPrefix:post_"`
	OppReview Review `json:"opp_review" gorm:"embedded;embeddedPrefix:r2_"`
	MyReview  Review `json:"my_review" gorm:"embedded;embeddedPrefix:r1_"`
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

func (store IReviewStore) GetReviews(userID string) []PR {
	var reviewList []PR
	db.Model(&PR{}).Raw("select posts.id as `post_id`, posts.author_id as `post_author_id`, posts.tags as `post_tags`, posts.title as `post_title`, posts.sub as `post_sub`, posts.type as `post_type`, posts.content as `post_content`, posts.clr_back as `post_clr_back`, posts.clr_tag as `post_clr_tag`, posts.clr_font as `post_clr_font`, posts.sub as `post_sub`, r1.content as `r1_content`, r1.writer_id as `r1_writer_id`, r1.point as `r1_point`, r2.content as `r2_content`, r2.writer_id as `r2_writer_id`, r2.point as `r2_point` from posts LEFT OUTER JOIN (SELECT reviews.* from reviews where target_user_id  = ?) as r1 ON r1.post_id = posts.id LEFT OUTER JOIN (SELECT reviews.* from reviews where writer_id  = ?) as r2  ON r2.post_id = posts.id where r1.content is not NULL or r2.content is not NULL;", userID, userID).Preload(clause.Associations).Find(&reviewList)
	userMap := make(map[string]User)
	for i := range reviewList {
		userMap[reviewList[i].OppReview.WriterID] = User{}
	}
	for key := range userMap {
		userMap[key] = *UserStore.GetUser(key)
	}
	for i := range reviewList {
		reviewList[i].OppReview.Writer = userMap[reviewList[i].OppReview.WriterID]
	}
	return reviewList
}

func (store IReviewStore) GetReviewByPostID(postID string) PR {
	var review PR
	db.Model(&PR{}).Raw("select posts.id as `post_id`, posts.author_id as `post_author_id`, posts.tags as `post_tags`, posts.title as `post_title`, posts.sub as `post_sub`, posts.type as `post_type`, posts.content as `post_content`, posts.clr_back as `post_clr_back`, posts.clr_tag as `post_clr_tag`, posts.clr_font as `post_clr_font`, posts.sub as `post_sub`, r1.content as `r1_content`, r1.writer_id as `r1_writer_id`, r1.point as `r1_point`, r2.content as `r2_content`, r2.writer_id as `r2_writer_id`, r2.point as `r2_point` from posts LEFT OUTER JOIN reviews as r1 ON r1.post_id = posts.id and r1.writer_id = posts.author_id LEFT OUTER JOIN reviews as r2 ON r2.post_id = posts.id and r2.writer_id != posts.author_id where posts.id = ?", postID).Preload(clause.Associations).Scan(&review)
	review.OppReview.Writer = *UserStore.GetUser(review.OppReview.WriterID)
	review.MyReview.Writer = *UserStore.GetUser(review.MyReview.WriterID)
	review.Post.Author = *UserStore.GetUser(review.Post.AuthorID)
	return review
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
	return count == 0
}
