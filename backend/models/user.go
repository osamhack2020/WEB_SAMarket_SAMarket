package models

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type User struct {
	// 유저 PRI KEY
	Id string `gorm:"primary_key"`
	// 유저 로그인 아이디
	LoginId string `gorm:"unique"`
	// 비밀번호
	Password string
	// 이름
	Name string
	// 전화번호
	Phone string
	// 프로필 사진
	ProfileURL string
	// 군 종류
	Mil uint
	// 부대 id
	UnitId uint
	Unit   Unit
}

func GetUserByIDAndPW(id string, pw string) *User {
	var user User
	err := db.Where("login_id = ? AND password = ?", id, pw).First(&user).Error
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return &user
}

func AddUser(user User) {
	err := db.Select("LoginId", "Password", "Name", "Phone", "Mil", "UnitId").Create(&user).Error
	if err != nil {
		fmt.Println(err)
	}
}

type UserProfile struct {
	// Pri
	Id string
	// 이름
	Name string
	// 군 종류
	Mil uint
	// 부대
	UnitId uint
	Unit   Unit
	// 프로필 사진
	ProfileURL string
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.Id = uuid.NewV4().String()
	return
}

func GetUser(id string) *User {
	var user User
	db.Where("id = ?", id).Preload("Unit").Find(&user)
	return &user
}

func GetUserProfile(id string) *UserProfile {
	var userProfile UserProfile
	db.Model(&User{}).Where("id = ?", id).Find(&userProfile)
	db.Where("id = ?", userProfile.UnitId).Find(&userProfile.Unit)
	return &userProfile
}
