package models

type Unit struct {
	Id   uint   `json:"id"`
	Mil  uint   `json:"mil"`
	Name string `json:"name"`
}

func GetUnitList() []Unit {
	var ret []Unit
	db.Find(&ret)
	return ret
}
