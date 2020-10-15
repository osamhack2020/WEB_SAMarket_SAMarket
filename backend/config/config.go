package config

import (
	"fmt"
	"os"
	"time"

	"crypto/sha512"
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Server struct {
		Host    string `yaml:"host"`
		Port    string `yaml:"port"`
		Mode    string `yaml:"mode"`
		Timeout struct {
			Server time.Duration `yaml:"server"`
			Write  time.Duration `yaml:"write"`
			Read   time.Duration `yaml:"read"`
			Idle   time.Duration `yaml:"idle"`
		} `yaml:"timeout"`
	} `yaml:"server"`

	DB struct {
		Host     string `yaml:"host"`
		Port     string `yaml:"port"`
		User     string `yaml:"username"`
		Password string `yaml:"password"`
		Database string `yaml:"database"`
	} `yaml:"db"`

	Redis struct {
		Host string `yaml:"host"`
		Port string `yaml:"port"`
	}

	Key struct {
		JWT        string `yaml:"jwt"`
		Crypt      string `yaml:"crypt"`
		JWTBytes   []byte
		CryptBytes []byte
	}
}

var Settings *Config

func Init() {
	var err error
	runMode := os.Getenv("SA_RUN")
	if len(runMode) == 0 {
		runMode = "debug"
	}

	Settings, err = LoadConfig("./" + runMode + ".yaml")
	if err != nil {
		fmt.Print(err)
	}

	boardName, err := ioutil.ReadFile("/sys/class/dmi/id/board_name")
	productUUID, err := ioutil.ReadFile("/sys/class/dmi/id/product_uuid")
	if len(Settings.Key.JWT) == 0 {
		Settings.Key.JWT = string(boardName) + string(productUUID) + "SAMARKET"
	}
	hasher := sha512.New()
	hasher.Write([]byte(Settings.Key.JWT))
	Settings.Key.JWTBytes = hasher.Sum(nil)
	hasher = sha512.New()
	hasher.Write([]byte(Settings.Key.Crypt))
	Settings.Key.CryptBytes = hasher.Sum(nil)
}

func LoadConfig(path string) (*Config, error) {
	config := &Config{}
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	d := yaml.NewDecoder(file)

	if err := d.Decode(&config); err != nil {
		return nil, err
	}

	return config, nil
}

func DBURL() string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
		Settings.DB.User,
		Settings.DB.Password,
		Settings.DB.Host,
		Settings.DB.Port,
		Settings.DB.Database,
	)
}
