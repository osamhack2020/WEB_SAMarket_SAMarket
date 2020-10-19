package models

type Image struct {
	ID     int
	UserID string
	User   User
	url    string
}

type IImageStore struct{}

var ImageStore IImageStore

func (store IImageStore) addImage() {

}
