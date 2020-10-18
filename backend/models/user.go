package models

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type User struct {
	// 유저 PRI KEY
	ID string `gorm:"primary_key;size:36"`
	// 유저 로그인 아이디
	LoginID string `gorm:"unique"`
	// 비밀번호
	Password string `json:"-"`
	// 이름
	Name string
	// 전화번호
	Phone string
	// 프로필 사진
	ProfileURL string
	// 군 종류
	Mil uint
	// 부대 id
	UnitID uint
	Unit   Unit
}

type IUserStore struct{}

var UserStore IUserStore

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.NewV4().String()
	return
}

func (store IUserStore) GetUserByIDAndPW(id string, pw string) *User {
	var user User
	err := db.Where("login_id = ? AND password = ?", id, pw).First(&user).Error
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return &user
}

func (store IUserStore) AddUser(user User) {
	err := db.Select("LoginID", "Password", "Name", "Phone", "Mil", "UnitID").Create(&user).Error
	if err != nil {
		fmt.Println(err)
	}
}

func (store IUserStore) GetUser(id string) *User {
	var user User
	db.Where("id = ?", id).Preload("Unit").Find(&user)
	return &user
}

func (store IUserStore) GetFriendList(user User) {
	db.Model(&UserRelation{}).Where("first_id = ? or second_id = ?", user.ID, user.ID)
}
