package config

import (
	"fmt"
)

// DBConfig represents db configuration
type DBConfig struct {
 Host     string
 Port     int
 User     string
 DBName   string
 Password string
}

func BuildDBConfig() *DBConfig {
 dbConfig := DBConfig{
  Host:     "localhost",
  Port:     3306,
  User:     "root",
  Password: "toor",
  DBName:   "samarket",
 }
 return &dbConfig
}


func DBURL(dbConfig *DBConfig) string {
    return fmt.Sprintf(
     "%s:%s@tcp(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local",
     dbConfig.User,
     dbConfig.Password,
     dbConfig.Host,
     dbConfig.Port,
     dbConfig.DBName,
    )
   }

func DefaultDB() string {
    return DBURL(BuildDBConfig())
}
