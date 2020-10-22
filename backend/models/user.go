package models

import (
	"fmt"
	"time"

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
	Follows   []*User     `gorm:"many2many:follows;" json:"-"`
	Favorites []Post      `gorm:"many2many:favorites;" json:"-"`
	CreatedAt time.Time
	UpdatedAt time.Time
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

func (store IUserStore) AddUser(user User) error {
	err := db.Select("ID", "LoginID", "Password", "Name", "Phone", "Mil", "UnitID").Create(&user).Error
	return err
}

func (store IUserStore) GetUser(id string) *User {
	var user User
	db.Where("id = ?", id).Preload("Unit").Find(&user)
	return &user
}

func (store IUserStore) GetFollowingList(user User) []User {
	var users []User
	db.Raw("select users.* from follows, users where follows.user_id = ? and follows.follow_id = users.id", user.ID).Scan(&users)
	return users
}

func (store IUserStore) GetFollowerList(user User) []User {
	var users []User
	db.Raw("select users.* from follows, users where follows.follow_id = ? and follows.user_id = users.id", user.ID).Scan(&users)
	return users
}

func (store IUserStore) AddFollow(uuidfrom string, uuidto string) {
	db.Exec("INSERT INTO follows (user_id, follow_id) VALUES (?, ?);", uuidfrom, uuidto)
}

func (store IUserStore) DeleteFollow(uuidfrom string, uuidto string) {
	db.Exec("DELETE FROM follows where user_id = ? and follow_id = ?", uuidfrom, uuidto)
}
