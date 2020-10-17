package models

type Unit struct {
	// 부대 PRI KEY
	Id uint `json:"id"`
	// 부대 종류 (육 = 0, 해 = 1, 공 = 2, 해병 = 3, 국 = 4)
	Mil uint `json:"mil"`
	// 부대 이름
	Name string `json:"name"`
}

func GetUnitList() []Unit {
	var ret []Unit
	db.Find(&ret)
	return ret
}
