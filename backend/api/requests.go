package api

type LoginRequest struct {
	// 로그인 아이디
	LoginID string `json:"id"`
	// 로그인 비밀번호
	Password string `json:"pw"`
}
