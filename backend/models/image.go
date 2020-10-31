package models

type Image struct {
	ID       int    `json:"id"`
	UserID   string `json:"user_id"`
	User     User   `json:"user"`
	Filename string `json:"filename"`
}

type IImageStore struct{}

var ImageStore IImageStore

func (store IImageStore) addImage() {

}
