import React from "react";

export const SquadTypeLabel = ({ type }) => (
  <div
    style={{
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      height: "34px",
      padding: "0 12px",
      borderRadius: "8px",
      backgroundColor: type === "Main" ? "#CC1A25" : "#006BFF",
    }}
  >
    <span style={{ color: "#ffffff", fontStyle: "italic", fontWeight: "700" }}>
      {type === "Main" ? "STRIKER" : "SPECIAL"}
    </span>
  </div>
);
