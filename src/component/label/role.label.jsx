import "./role.label.scss";
import { StudentRole } from "data";
import React from "react";

export const RoleLabel = ({ role }) => (
  <div className="role-label">
    <img src={`/role/Role_${role}.png`} alt="" />
    <span className="cannot-select">{StudentRole[role]}</span>
  </div>
);
