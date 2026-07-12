import "./app.scss";
import { Button, ConfigProvider, Radio } from "antd";
import {
  AttackDefenseTypeLabel,
  GiftLabel,
  Header,
  RoleLabel,
  SchoolLabel,
  SquadTypeLabel,
  StudentSelect,
} from "component";
import { Club, GuessGameMode, StudentData, StudentReleaseDate } from "data";
import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";

function App() {
  const guessGameplayColumns = [
    "Student",
    "School",
    "Type",
    "Role",
    "Attack Type",
    "Defense Type",
    "Weapon Type",
    "EX Skill Cost",
  ];
  const guessLoreColumns = [
    "Student",
    "School",
    "Year",
    "Club",
    "Height (cm)",
    "Birthday",
    "Weapon Type",
    "Release Date",
    "Fav SSR Gift",
  ];
  const minGuessToGiveUp = 5;

  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isGiveUp, setIsGiveUp] = useState(false);
  const [gameMode, setGameMode] = useState(GuessGameMode.Gameplay);
  const [guessStudentsId, setGuessStudentsId] = useState([]);
  const [targetStudentId, setTargetStudentId] = useState("");

  const randomTargetStudent = () => {
    const randIdx = Math.floor(Math.random() * Object.keys(StudentData).length);
    setTargetStudentId(Object.keys(StudentData)[randIdx]);
    // console.log(StudentData[Object.keys(StudentData)[randIdx]]?.name);
  };

  const chooseStudent = (studentId) => {
    // add new student id to guess list
    setGuessStudentsId((prev) => [...prev, studentId]);
    // check if it is correct to stop the game
    if (studentId === targetStudentId) {
      setIsGameRunning(false);
    }
  };

  const chooseRandomStudent = () => {
    const randIdx = Math.floor(Math.random() * Object.keys(StudentData).length);
    const studentId = Object.keys(StudentData)[randIdx];
    chooseStudent(studentId);
  };

  const changeGameMode = (newGameMode) => {
    setGameMode(newGameMode);
    restartGame();
  };

  const restartGame = () => {
    randomTargetStudent();
    setIsGameRunning(true);
    setIsGiveUp(false);
    setGuessStudentsId([]);
  };

  const giveUp = () => {
    setIsGameRunning(false);
    setIsGiveUp(true);
  };

  useEffect(() => {
    restartGame();
    // for (let item of Object.values(StudentData)) {
    //   if (!StudentReleaseDate[item.name]) {
    //     console.log(item.name);
    //   }
    // }
  }, []);

  return (
    <>
      <div className="app">
        <div className="bg-image" />
        <Header />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#272727",
            },
          }}
        >
          <Radio.Group
            block
            options={[
              { label: GuessGameMode.Gameplay, value: GuessGameMode.Gameplay },
              { label: GuessGameMode.Lore, value: GuessGameMode.Lore },
            ]}
            defaultValue={GuessGameMode.Gameplay}
            optionType="button"
            buttonStyle="solid"
            onChange={(e) => {
              changeGameMode(e.target.value);
            }}
          />
        </ConfigProvider>
        {!isGameRunning && (
          <div className="mystery-student-answer">
            <img
              className="student-img"
              src={`/students/${targetStudentId}.webp`}
              alt=""
            />
            <span>
              The mystery student is <b>{StudentData[targetStudentId]?.name}</b>
            </span>
            {!isGiveUp && (
              <span>You did it in {guessStudentsId.length} tries!</span>
            )}
            {isGiveUp && <span>How did she slip your mind?</span>}
          </div>
        )}
        {isGameRunning && (
          <StudentSelect
            disabled={isGameRunning === false}
            selectedStudentsId={guessStudentsId}
            onChange={chooseStudent}
          />
        )}
        {!isGameRunning && (
          <Button color="default" variant="solid" onClick={restartGame}>
            <IoMdRefresh size={24} />
          </Button>
        )}
        <div className={`guess-table ${gameMode.toLowerCase()}`}>
          <div>
            {(gameMode === GuessGameMode.Gameplay
              ? guessGameplayColumns
              : guessLoreColumns
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
              targetStudentValue.favItem.length ===
                studentValue.favItem.length &&
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

            if (gameMode === GuessGameMode.Gameplay)
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
                </div>
              );
            else if (gameMode === GuessGameMode.Lore)
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
        {guessStudentsId.length === 0 && (
          <div className="pick-someone-container">
            <Button onClick={chooseRandomStudent}>Pick for me</Button>
          </div>
        )}
        {guessStudentsId.length >= minGuessToGiveUp && !isGiveUp && (
          <Button
            color="danger"
            variant="solid"
            onClick={giveUp}
            style={{ fontSize: "16px" }}
          >
            I give up
          </Button>
        )}
      </div>
    </>
  );
}

export default App;
