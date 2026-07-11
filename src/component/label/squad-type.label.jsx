import "./squad-type.label.scss";
import React from "react";

export const SquadTypeLabel = ({ type }) => (
  <div
    className="squad-type-label"
    style={{
      backgroundColor: type === "Main" ? "#CC1A25" : "#006BFF",
    }}
  >
    <span>{type === "Main" ? "STRIKER" : "SPECIAL"}</span>
  </div>
);
