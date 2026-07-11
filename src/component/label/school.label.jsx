import "./school.label.scss";
import { School } from "data";
import React from "react";

export const SchoolLabel = ({ school }) => {
  const formatSchool = Object.keys(School).includes(school) ? school : "ETC";

  return (
    <div className="school-label">
      <img src={`/school/${formatSchool}.png`} alt="" />
    </div>
  );
};
