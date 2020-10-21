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
	Mil int
	// 부대 id
	UnitID    int
	Unit      Unit
	ChatRooms []*ChatRoom `gorm:"many2many:user_chatrooms;" json:"-"`
	Friends   []*User     `gorm:"many2many:friends;" json:"-"`
	Favorites []Post      `gorm:"many2many:favorites;" json:"-"`
}

type IUserStore struct{}

var UserStore IUserStore

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.NewV4().String()
	return
}

func (store IUserStore) GetUserByIDAndPW(id string, pw string) *User {
	var user User
	err := db.Where("login_id = ? AND password = ?", id, pw).Preload("Unit").First(&user).Error
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return &user
}

func (store IUserStore) AddUser(user User) {
	err := db.Select("ID", "LoginID", "Password", "Name", "Phone", "Mil", "UnitID").Create(&user).Error
	if err != nil {
		fmt.Println(err)
	}
}

func (store IUserStore) GetUser(id string) *User {
	var user User
	db.Where("id = ?", id).Preload("Unit").Find(&user)
	return &user
}

func (store IUserStore) GetFriendList(user User) []User {
	var users []User
	db.Model(&user).Association("Users").Find(&users)
	return users
}
