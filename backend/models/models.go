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
	gormConfig := &gorm.Config{}
	if config.Settings.Server.Mode == "debug" {
		gormConfig.Logger = logger.Default.LogMode(logger.Info)
	}
	db, err = gorm.Open(mysql.Open(config.DBURL()), gormConfig)
	if err != nil {
		fmt.Println(err)
	}
	db.AutoMigrate(&User{}, &Unit{}, &ChatRoom{}, &ChatMsg{}, &Comment{}, &Post{}, &Review{}, &Noti{})
}
