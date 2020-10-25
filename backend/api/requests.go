package api

import (
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
	LoginID  string
	Password string
	Phone    string
	UnitID   int
	Mil      int
	Name     string
}

/* Chat Request Models */
type AddChatMsgRequest struct {
	ChatRoomID int
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
	Title    string
	PostType string
	Tags     string
}

/* Review Request Models */

/* Unit Request Models */

/* User Request Models */
