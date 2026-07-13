import "./app.scss";
import { Button } from "antd";
import {
  GameModeRadio,
  GuessTable,
  Header,
  HelpModal,
  MoreProjectModal,
  StudentSelect,
} from "component";
import { ContentCategory, GameMode, LSK, StudentData } from "data";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { Util } from "utils";

function App() {
  const minGuessToGiveUp = 5;
  const today = Util.getToday();
  const yesterday = Util.getYesterday();

  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isGiveUp, setIsGiveUp] = useState(false);
  const [contentCategory, setContentCategory] = useState(
    localStorage.getItem(LSK.selectedContentCategory) ??
      ContentCategory.Gameplay,
  );
  const [gameMode, setGameMode] = useState(
    localStorage.getItem(LSK.selectedGameMode) ?? GameMode.Daily,
  );
  const [guessStudentsId, setGuessStudentsId] = useState([]);
  const [targetStudentId, setTargetStudentId] = useState("");
  const [yesterdayTargetStudentId, setYesterdayTargetStudentId] = useState("");
  const [remainingTimeUntilDailyRefresh, setRemainingTimeUntilDailyRefresh] =
    useState("");

  // modal
  const [helpModalStatus, setHelpModalStatus] = useState(false);
  const [moreProjectModalStatus, setMoreProjectModalStatus] = useState(false);

  const randomTargetStudent = () => {
    const randIdx = Math.floor(Math.random() * Object.keys(StudentData).length);
    setTargetStudentId(Object.keys(StudentData)[randIdx]);
  };

  const assignTargetStudent = (gameMode) => {
    const randIdx = Util.getSeededRandomFromDate(
      gameMode,
      today,
      0,
      Object.keys(StudentData).length,
    );
    const assignedStudentId = Object.keys(StudentData)[randIdx];
    setTargetStudentId(assignedStudentId);
    return assignedStudentId;
  };

  const updateYesterdayStudent = () => {
    const randIdx = Util.getSeededRandomFromDate(
      contentCategory,
      yesterday,
      0,
      Object.keys(StudentData).length,
    );
    setYesterdayTargetStudentId(Object.keys(StudentData)[randIdx]);
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

  const restartGame = () => {
    let assignedStudentId = "";
    if (gameMode === GameMode.Daily) {
      assignedStudentId = assignTargetStudent(contentCategory);
    } else {
      randomTargetStudent();
    }
    updateYesterdayStudent();
    setIsGameRunning(true);
    setIsGiveUp(false);
    if (gameMode === GameMode.Daily) {
      let lsk = LSK.dailyGuessGameplay;
      if (contentCategory === ContentCategory.Lore) {
        lsk = LSK.dailyGuessLore;
      }
      let saveData = localStorage.getItem(lsk);
      if (saveData) {
        try {
          saveData = JSON.parse(saveData);
        } catch (error) {
          console.error("Cannot read save data with error:", error);
          setGuessStudentsId([]);
        }
        if (saveData.date && dayjs.utc(saveData.date).isSame(today)) {
          setGuessStudentsId(saveData.guessStudentsId ?? []);
          setIsGiveUp(saveData.isGiveUp ?? false);
          // case win
          if (saveData.guessStudentsId.at(-1) === assignedStudentId) {
            setIsGameRunning(false);
          }
          // case give up
          if (saveData.isGiveUp) {
            setIsGameRunning(false);
          }
          return;
        }
      }
    }
    setGuessStudentsId([]);
  };

  const giveUp = () => {
    setIsGameRunning(false);
    setIsGiveUp(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs().utc();
      const startOfNextDay = dayjs()
        .utc()
        .add(1, "day")
        .startOf("day")
        .add(19, "hour");
      const diff = dayjs.duration(startOfNextDay.diff(now));
      setRemainingTimeUntilDailyRefresh(diff.format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    restartGame();
  }, [contentCategory, gameMode]);

  useEffect(() => {
    if (gameMode === GameMode.Daily) {
      // update local storage
      const saveData = {
        date: today.format("YYYY-MM-DD"),
        guessStudentsId,
        isGiveUp,
      };
      let lsk = LSK.dailyGuessGameplay;
      if (contentCategory === ContentCategory.Lore) {
        lsk = LSK.dailyGuessLore;
      }
      localStorage.setItem(lsk, JSON.stringify(saveData));
    }
  }, [guessStudentsId, isGameRunning, isGiveUp]);

  return (
    <>
      <HelpModal
        modalStatus={helpModalStatus}
        setModalStatus={setHelpModalStatus}
      />
      <MoreProjectModal
        modalStatus={moreProjectModalStatus}
        setModalStatus={setMoreProjectModalStatus}
      />
      <div className="app">
        <div className="bg-image" />
        <Header
          setHelpModalStatus={setHelpModalStatus}
          setMoreProjectModalStatus={setMoreProjectModalStatus}
        />
        <GameModeRadio
          contentCategory={contentCategory}
          setContentCategory={setContentCategory}
          gameMode={gameMode}
          setGameMode={setGameMode}
        />
        {/* Answer student label */}
        {!isGameRunning && (
          <div className="mystery-student-answer">
            <img
              className="student-img"
              src={`/students/${targetStudentId}.webp`}
              alt=""
            />
            <span className="text-center">
              The{gameMode === GameMode.Daily ? " daily" : ""} mystery student
              is <b>{StudentData[targetStudentId]?.name}</b>
            </span>
            {!isGiveUp && (
              <span>You did it in {guessStudentsId.length} tries!</span>
            )}
            {isGiveUp && <span>How did she slip your mind?</span>}
          </div>
        )}
        {/* Count down new day label */}
        {!isGameRunning && gameMode === GameMode.Daily && (
          <span className="text-center">
            Daily mystery student refreshs in {remainingTimeUntilDailyRefresh}
          </span>
        )}
        {isGameRunning && (
          <StudentSelect
            disabled={isGameRunning === false}
            selectedStudentsId={guessStudentsId}
            onChange={chooseStudent}
          />
        )}
        {/* Restart game button */}
        {!isGameRunning && gameMode === GameMode.Endless && (
          <Button color="default" variant="solid" onClick={restartGame}>
            <IoMdRefresh size={24} />
          </Button>
        )}
        <GuessTable
          contentCategory={contentCategory}
          guessStudentsId={guessStudentsId}
          targetStudentId={targetStudentId}
        />
        {/* Pick someone button */}
        {guessStudentsId.length === 0 && (
          <div className="pick-someone-container">
            <Button onClick={chooseRandomStudent}>Pick someone for me</Button>
          </div>
        )}
        {/* I give up button */}
        {isGameRunning &&
          !isGiveUp &&
          guessStudentsId.length >= minGuessToGiveUp && (
            <Button
              color="danger"
              variant="solid"
              onClick={giveUp}
              style={{ fontSize: "16px" }}
            >
              I give up
            </Button>
          )}
        {/* Yesterday's student label */}
        {gameMode === GameMode.Daily && guessStudentsId.length === 0 && (
          <div className="mystery-student-answer">
            <img
              className="student-img"
              src={`/students/${yesterdayTargetStudentId}.webp`}
              alt=""
            />
            <span>Yesterday's student was </span>
            <b>{StudentData[yesterdayTargetStudentId]?.name}</b>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
