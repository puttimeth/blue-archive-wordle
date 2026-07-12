import "./guess.table.scss";
import {
  AttackDefenseTypeLabel,
  GiftLabel,
  RoleLabel,
  SchoolLabel,
  SquadTypeLabel,
} from "./label";
import {
  Club,
  ContentCategory,
  GuessGameplayColumns,
  GuessLoreColumns,
  StudentData,
  StudentReleaseDate,
} from "data";

export const GuessTable = ({
  contentCategory,
  guessStudentsId,
  targetStudentId,
}) => {
  return (
    <div className={`guess-table ${contentCategory.toLowerCase()}`}>
      <div>
        {(contentCategory === ContentCategory.Gameplay
          ? GuessGameplayColumns
          : GuessLoreColumns
        ).map((item) => (
          <b key={item}>{item}</b>
        ))}
      </div>
      {guessStudentsId.toReversed().map((studentId) => {
        const targetStudentValue = StudentData[targetStudentId];
        const studentValue = StudentData[studentId];
        let giftCompareState = "wrong";
        const targetStudentValueBirthday = new Date(
          targetStudentValue.birthday.replace(/st|nd|rd|th/g, ""),
        );
        const studentValueBirthday = new Date(
          studentValue.birthday.replace(/st|nd|rd|th/g, ""),
        );
        const targetStudentValueReleaseDate = new Date(
          StudentReleaseDate[targetStudentValue.name],
        );
        const studentValueReleaseDate = new Date(
          StudentReleaseDate[studentValue.name],
        );

        if (
          targetStudentValue.favItem.length === studentValue.favItem.length &&
          targetStudentValue.favItem.every((e) =>
            studentValue.favItem.includes(e),
          )
        ) {
          giftCompareState = "correct";
        } else if (
          targetStudentValue.favItem.some((e) =>
            studentValue.favItem.includes(e),
          )
        ) {
          giftCompareState = "partial";
        }

        if (contentCategory === ContentCategory.Gameplay)
          return (
            <div key={studentId}>
              <div
                className={`content-item ${targetStudentId === studentId ? "correct" : "wrong"}`}
              >
                <img
                  className="student-img"
                  src={`/students/${studentId}.webp`}
                  alt=""
                />
              </div>
              <div
                className={`content-item ${targetStudentValue.school === studentValue.school ? "correct" : "wrong"}`}
              >
                <SchoolLabel school={studentValue.school} />
              </div>
              <div
                className={`content-item ${targetStudentValue.squadType === studentValue.squadType ? "correct" : "wrong"}`}
              >
                <SquadTypeLabel type={studentValue.squadType} />
              </div>
              <div
                className={`content-item ${targetStudentValue.tacticRole === studentValue.tacticRole ? "correct" : "wrong"}`}
              >
                <RoleLabel role={studentValue.tacticRole} />
              </div>
              <div
                className={`content-item ${targetStudentValue.bulletType === studentValue.bulletType ? "correct" : "wrong"}`}
              >
                <AttackDefenseTypeLabel type={studentValue.bulletType} />
              </div>
              <div
                className={`content-item ${targetStudentValue.armorType === studentValue.armorType ? "correct" : "wrong"}`}
              >
                <AttackDefenseTypeLabel type={studentValue.armorType} />
              </div>
              <div
                className={`content-item ${targetStudentValue.weaponType === studentValue.weaponType ? "correct" : "wrong"}`}
              >
                <span style={{ fontSize: "20px" }}>
                  {studentValue.weaponType}
                </span>
              </div>
              <div
                className={`content-item ${targetStudentValue.exSkillCost === studentValue.exSkillCost ? "correct" : "wrong"} ${targetStudentValue.exSkillCost > studentValue.exSkillCost ? "more" : ""} ${targetStudentValue.exSkillCost < studentValue.exSkillCost ? "less" : ""}`}
              >
                <span style={{ fontSize: "20px" }}>
                  {studentValue.exSkillCost}
                </span>
              </div>
              <div
                className={`content-item ${targetStudentValueReleaseDate.getTime() === studentValueReleaseDate.getTime() ? "correct" : "wrong"} ${targetStudentValueReleaseDate > studentValueReleaseDate ? "more" : ""} ${targetStudentValueReleaseDate < studentValueReleaseDate ? "less" : ""}`}
              >
                <span style={{ textAlign: "center" }}>
                  {studentValueReleaseDate.getFullYear()}{" "}
                  {studentValueReleaseDate.toLocaleDateString("en-US", {
                    month: "long",
                  })}
                </span>
              </div>
            </div>
          );
        else if (contentCategory === ContentCategory.Lore)
          return (
            <div key={studentId}>
              <div
                className={`content-item ${targetStudentId === studentId ? "correct" : "wrong"}`}
              >
                <img
                  className="student-img"
                  src={`/students/${studentId}.webp`}
                  alt=""
                />
              </div>
              <div
                className={`content-item ${targetStudentValue.school === studentValue.school ? "correct" : "wrong"}`}
              >
                <SchoolLabel school={studentValue.school} />
              </div>
              <div
                className={`content-item ${targetStudentValue.year === studentValue.year ? "correct" : "wrong"} ${targetStudentValue.year > studentValue.year ? "more" : ""} ${targetStudentValue.year < studentValue.year ? "less" : ""}`}
              >
                <span>{studentValue.year}</span>
              </div>
              <div
                className={`content-item ${targetStudentValue.club === studentValue.club ? "correct" : "wrong"}`}
              >
                <span style={{ textAlign: "center" }}>
                  {Club[studentValue.club]}
                </span>
              </div>
              <div
                className={`content-item ${targetStudentValue.height === studentValue.height ? "correct" : "wrong"} ${targetStudentValue.height > studentValue.height ? "more" : ""} ${targetStudentValue.height < studentValue.height ? "less" : ""}`}
              >
                <span>{studentValue.height}</span>
              </div>
              <div
                className={`content-item ${targetStudentValue.birthday === studentValue.birthday ? "correct" : "wrong"} ${targetStudentValueBirthday > studentValueBirthday ? "more" : ""} ${targetStudentValueBirthday < studentValueBirthday ? "less" : ""}`}
              >
                <span style={{ textAlign: "center" }}>
                  {studentValue.birthday}
                </span>
              </div>
              <div
                className={`content-item ${targetStudentValue.weaponType === studentValue.weaponType ? "correct" : "wrong"}`}
              >
                <span style={{ fontSize: "20px" }}>
                  {studentValue.weaponType}
                </span>
              </div>
              <div
                className={`content-item ${targetStudentValueReleaseDate.getTime() === studentValueReleaseDate.getTime() ? "correct" : "wrong"} ${targetStudentValueReleaseDate > studentValueReleaseDate ? "more" : ""} ${targetStudentValueReleaseDate < studentValueReleaseDate ? "less" : ""}`}
              >
                <span style={{ textAlign: "center" }}>
                  {studentValueReleaseDate.getFullYear()}{" "}
                  {studentValueReleaseDate.toLocaleDateString("en-US", {
                    month: "long",
                  })}
                </span>
              </div>
              <div className={`content-item ${giftCompareState}`}>
                <GiftLabel gifts={studentValue.favItem} />
              </div>
            </div>
          );
      })}
    </div>
  );
};
