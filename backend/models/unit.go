package models

type Unit struct {
	// 부대 PRI KEY
	ID int `json:"id"`
	// 부대 종류 (육 = 0, 해 = 1, 공 = 2, 해병 = 3, 국 = 4)
	Mil int `json:"mil"`
	// 부대 이름
	Name string `json:"name"`
	// 부대마크
	LogoURL string
}

type IUnitStore struct{}

var UnitStore IUnitStore

func (store IUnitStore) GetUnitList() []Unit {
	var ret []Unit
	db.Find(&ret)
	return ret
}
