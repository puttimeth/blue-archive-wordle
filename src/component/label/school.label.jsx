import { School } from "data";
import React from "react";

export const SchoolLabel = ({ school }) => {
  const formatSchool = Object.keys(School).includes(school) ? school : "ETC";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={`/school/${formatSchool}.png`}
        alt=""
        style={{
          width: "60px",
          height: "auto",
          objectFit: "contain",
          filter: "brightness(0) saturate(100%)",
        }}
      />
      {/* <span>{School[formatSchool]}</span> */}
    </div>
  );
};
