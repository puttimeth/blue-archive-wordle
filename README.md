# Blue Archive Wordle

Website to play wordle using Blue Archive's students.

# Features

### 2 Game modes

1. Daily - guess a new mystery student everyday
2. Endless - play as much as you want

### 2 Content categories

1. Gameplay - the clues are information about in-game mechanics
2. Lore - Focuses on students as characters and their backgrounds

# For Developer

## Add new student

1. Add `webp` image of the student (prefers `200x226 pixel`) to `/public/students` directory with the file's name be their `id`.
2. Add student's data to [`student-data.json`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/json/student-data.json). The data should be added sorted by their id.
   - The data can be added manually or run `yarn extract-data` while placing [`students.json`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/manage/students.json) file in `/src/data/manage`.
   - `students.json` file comes from [Schale DB](https://schaledb.com)
3. Add mapping between student's name and release date to [`student-release-date.json`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/json/student-release-date.json)

## Add new item

1. Get new `items.json` from [Schale DB](https://schaledb.com) and place it in `/src/data/manage`.
2. Add `webp` image of the new item to `/public/item` directory with the file's name used in [`items.json`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/manage/items.json)

## Add new club

1. Add new club mapping to [`student.data.js/Club`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/student.data.js).
   - The key is the string used in [`student-data.json`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/json/student-data.json) and value is the displayed club's name shown in [Schale DB](https://schaledb.com).

## Add new school

1. Add new school mapping to [`student.data.js/School`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/student.data.js).
   - The key is the string used in [`student-data.json`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/json/student-data.json) and value is the displayed school's name shown in [Schale DB](https://schaledb.com).
2. Add `png` image of the school logo to `/public/school` directory with the file's name be the key of `student.data.js/School` object.

## Add new attack/defense type

1. Add new attack/defense type mapping to [`student.data.js/StudentAttackType`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/student.data.js), `student.data.js/StudentDefenseType` and `student.data.js/AttackDefenseTypeColor`.
   - The key is the string used in [`student-data.json`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/json/student-data.json) and value is the displayed type's name shown in [Schale DB](https://schaledb.com).
   - The color is order according to the order of `student.data.js/StudentAttackType` and `student.data.js/StudentDefenseType`.

## Add new role

1. Add new role mapping to [`student.data.js/StudentRole`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/student.data.js).
   - The key is the string used in [`student-data.json`](https://github.com/puttimeth/blue-archive-wordle/blob/main/src/data/json/student-data.json) and value is the displayed role's name shown in [Schale DB](https://schaledb.com).
2. Add `png` image of the role icon to `/public/role` directory with the file's name be the key of `student.data.js/StudentRole` object.
