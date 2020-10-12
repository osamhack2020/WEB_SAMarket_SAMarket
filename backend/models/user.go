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

func GetUser() *User {
	var user User
	db.First(&user)
	return &user
}
