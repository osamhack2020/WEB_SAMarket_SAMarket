import { samroads } from "../../data/samroads.json";

function MakeDataGenerator(items) {
  let itemIdx = 0;
  return function getNextData() {
    const item = items[itemIdx % items.length];
    itemIdx += 1;
    return { ...item, id: itemIdx };
  };
}

export const getNextSAMroad = MakeDataGenerator(samroads);
