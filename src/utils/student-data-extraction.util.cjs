const fs = require("fs");
const itemData = require("./items.json");
const studentdata = require("./students.json");

let items = {};

for (let [_, item] of Object.entries(itemData)) {
  if (item["Category"] !== "Favor" || item["Rarity"] !== "SSR") continue;
  items[item["Name"]] = {
    icon: item["Icon"],
    tags: item["Tags"],
  };
}

let students = {};
const studentNames = [];

for (let [_, item] of Object.entries(studentdata)) {
  // skip duplicated name (for students with variants)
  if (studentNames.includes(item["Name"])) continue;
  studentNames.push(item["Name"]);
  const rawFavItemTags = item["FavorItemTags"];
  const rawFavItemUniqueTags = item["FavorItemUniqueTags"];
  let favItems = [];
  let favItemsUnique = [];
  for (let [_, itemData] of Object.entries(items)) {
    const itemDataSet = itemData.tags;
    if (itemDataSet.some((e) => rawFavItemTags.includes(e))) {
      if (!favItems.includes(itemData.icon)) favItems.push(itemData.icon);
    }
    if (itemDataSet.some((e) => rawFavItemUniqueTags.includes(e))) {
      if (!favItems.includes(itemData.icon)) favItems.push(itemData.icon);
    }
  }
  students[item["Id"]] = {
    defaultOrder: item["DefaultOrder"],
    name: item["Name"],
    school: item["School"],
    club: item["Club"],
    squadType: item["SquadType"],
    tacticRole: item["TacticRole"],
    bulletType: item["BulletType"],
    armorType: item["ArmorType"],
    position: item["Position"],
    weaponType: item["WeaponType"],
    exSkillCost: item["Skills"]["Ex"]["Cost"][4],
    height: item["CharHeightMetric"],
    birthday: item["Birthday"],
    favItem: favItems,
    favItemsUnique: favItemsUnique,
  };
}

fs.writeFile(
  "./src/utils/student-data.json",
  JSON.stringify(students),
  () => {},
);
console.log(Object.keys(students).length);
