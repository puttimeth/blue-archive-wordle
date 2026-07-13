import "./attack-defense-type.label.scss";
import {
  AttackDefenseTypeColor,
  StudentAttackType,
  StudentDefenseType,
} from "data";
import React from "react";

export const AttackDefenseTypeLabel = ({ type }) => {
  let typeIdx = 0;
  let attackOrDefense = "Defense";
  if (Object.keys(StudentAttackType).includes(type)) {
    typeIdx = Object.keys(StudentAttackType).indexOf(type);
    attackOrDefense = "Attack";
  } else {
    typeIdx = Object.keys(StudentDefenseType).indexOf(type);
  }

  return (
    <div
      className="attack-defense-type-label"
      style={{
        border: `1px solid ${AttackDefenseTypeColor[typeIdx]}`,
        backgroundColor: AttackDefenseTypeColor[typeIdx],
      }}
    >
      <div
        className="img-wrapper"
        style={{
          backgroundColor: AttackDefenseTypeColor[typeIdx],
        }}
      >
        <img src={`/type/Type_${attackOrDefense}.png`} alt="" />
      </div>
      <span className="text cannot-select">
        {Object.keys(StudentAttackType).includes(type)
          ? StudentAttackType[type]
          : StudentDefenseType[type]}
      </span>
    </div>
  );
};
