import "./app.scss";
import { Table } from "antd";
import {
  AttackDefenseTypeLabel,
  Header,
  RoleLabel,
  SchoolLabel,
  SquadTypeLabel,
  StudentSelect,
} from "component";
import { studentData } from "data";
import React, { useEffect, useState } from "react";

function App() {
  const guessTableColumns = [
    { title: "Student", dataIndex: "student" },
    { title: "School", dataIndex: "school" },
    { title: "Type", dataIndex: "type" },
    { title: "Role", dataIndex: "role" },
    { title: "Attack Type", dataIndex: "attackType" },
    { title: "Defense Type", dataIndex: "defenseType" },
    { title: "Weapon Type", dataIndex: "weaponType" },
    { title: "EX Skill Cost", dataIndex: "exSkillCost" },
  ];
  const [guessTable, setGuessTable] = useState([]);

  useEffect(() => {
    setGuessTable(
      Object.entries(studentData).map(([studentKey, studentValue]) => ({
        key: studentKey,
        student: (
          <img
            className="student-img"
            src={`/students/${studentKey}.webp`}
            alt=""
          />
        ),
        school: <SchoolLabel school={studentValue.school} />,
        type: <SquadTypeLabel type={studentValue.squadType} />,
        role: <RoleLabel role={studentValue.tacticRole} />,
        attackType: <AttackDefenseTypeLabel type={studentValue.bulletType} />,
        defenseType: <AttackDefenseTypeLabel type={studentValue.armorType} />,
        weaponType: (
          <span style={{ fontSize: "20px" }}>{studentValue.weaponType}</span>
        ),
        exSkillCost: (
          <span style={{ fontSize: "20px" }}>{studentValue.exSkillCost}</span>
        ),
      })),
    );
  }, []);

  return (
    <>
      <div className="app">
        <div className="bg-image" />
        <Header />
        <StudentSelect />
        <div className="guess-table">
          <div>
            {guessTableColumns.map(({ title }) => (
              <b key={title}>{title}</b>
            ))}
          </div>
          {guessTable.map((item) => (
            <div key={item.key}>
              {guessTableColumns.map(({ dataIndex }) => (
                <div key={dataIndex} className="content-item correct">
                  {item[dataIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
