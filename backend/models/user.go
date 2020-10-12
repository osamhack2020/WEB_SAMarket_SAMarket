package models

// TODO: Hide secure information
type User struct {
	Id     uint   `json:"id"`
	UserId string `json:"userId"`
	Name   string `json:"name"`
	Phone  string `json:"phone"`
	Mil    uint   `json:"mil"`
	Corps  uint   `json:"corps"`
}

type UserResponse struct {
	Id   uint   `json:"id"`
	Name string `json:"name"`
}

func GetUser() *UserResponse {
	var user UserResponse
	db.Model(&User{}).First(&user)
	return &user
}
