package models

import (
	"fmt"
	"sam/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func Init() {
	var err error
	db, err = gorm.Open(mysql.Open(config.DBURL()), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		fmt.Println(err)
	}
	db.AutoMigrate(&User{}, &Unit{}, &ChatRoom{}, &ChatMsg{}, &Comment{}, &Post{}, &Review{})
}
