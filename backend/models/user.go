package models

type User struct {
	Id     uint
	UserId string
	Name   string
	Phone  string
	Mil    uint
	UnitId uint
	Unit   Unit
}

type UserResponse struct {
	Id   uint
	Name string
}

func GetUser() *UserResponse {
	var user UserResponse
	db.Model(&User{}).First(&user)
	return &user
}
