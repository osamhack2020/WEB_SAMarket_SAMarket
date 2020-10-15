package models

import (
	"fmt"
	"sam/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init() {
	var err error
	db, err = gorm.Open(mysql.Open(config.DBURL()), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
	}
	db.AutoMigrate(&User{}, &Unit{}, &ChatRoom{}, &Comment{}, &Post{})
}
