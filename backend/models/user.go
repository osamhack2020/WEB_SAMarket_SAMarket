package models

import (
	"time"

	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type User struct {
	// 유저 PRI KEY
	ID string `json:"id" gorm:"primary_key;size:36"`
	// 유저 로그인 아이디
	LoginID string `json:"login_id" gorm:"unique"`
	// 비밀번호
	Password string `json:"password" json:"-"`
	// 이름
	Name string `json:"name"`
	// 전화번호
	Phone string `json:"phone"`
	// 프로필 사진
	ProfileURL string `json:"profile_url"`
	// 군 종류
	Mil int `json:"mil"`
	// 부대 id
	Rank      string      `json:"rank"`
	UnitID    int         `json:"-"`
	Unit      Unit        `json:"unit"`
	ChatRooms []*ChatRoom `gorm:"many2many:user_chatrooms;" json:"-"`
	Follows   []*User     `gorm:"many2many:follows;" json:"-"`
	Favorites []Post      `gorm:"many2many:favorites;" json:"-"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
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
		return nil
	}
	return &user
}

func (store IUserStore) GetUserByLoginID(id string) *User {
	var user User
	err := db.Where("login_id = ?", id).Preload("Unit").First(&user).Error
	if err != nil {
		return nil
	}
	return &user
}

func (store IUserStore) AddUser(user User) error {
	err := db.Select("ID", "LoginID", "Password", "Name", "Phone", "Mil", "UnitID").Create(&user).Error
	return err
}

func (store IUserStore) UpdateProfileURL(userID string, profileURL string) {
	db.Exec("UPDATE users SET profile_url = ? where id = ?", profileURL, userID)
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

func (stoer IUserStore) CheckFollow(uuidfrom string, uuidto string) int {
	var result int
	db.Raw("SELECT COUNT(*) from follows where user_id = ? and follow_id = ?", uuidfrom, uuidto).Scan(&result)
	return result
}

func (store IUserStore) UpdateUser(user User) {
	db.Model(&User{}).Updates(user)
}
