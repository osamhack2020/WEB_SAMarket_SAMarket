package api

import (
	"sam/models"

	"gopkg.in/guregu/null.v4"
)

/* Auth Request Models */
type LoginRequest struct {
	// 로그인 아이디
	LoginID string `json:"id"`
	// 로그인 비밀번호
	Password string `json:"pw"`
}

type RegisterRequest struct {
	LoginID  string `json:"login_id"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
	UnitID   int    `json:"unit_id"`
	Mil      int    `json:"mil"`
	Name     string `json:"name"`
	Rank     int    `json:"rank"`
}

/* Chat Request Models */
type AddChatMsgRequest struct {
	ChatRoomID int    `json:"chat_room_id"`
	Text       string `json:"text"`
}

/* Comment Request Models */
type AddCommentRequest struct {
	ToReply null.Int `json:"to_reply" swaggertype:"integer"`
	PostID  int      `json:"post_id"`
	Content string   `json:"content"`
}

/* Post Request Models */
type AddPostRequest struct {
	Title    string           `json:"title"`
	PostType string           `json:"type"`
	Tags     []string         `json:"tags"`
	Content  string           `json:"content"`
	Clr      models.PostColor `json:"clr"`
	Sub      string           `json:"sub"`
}

/* Review Request Models */

/* Unit Request Models */

/* User Request Models */
