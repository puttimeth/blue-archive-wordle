import "./gift.label.scss";
import React from "react";

export const GiftLabel = ({ gifts }) => {
  return (
    <div className="gift-label">
      {gifts.map((item) => (
        <img key={item} src={`/item/${item}.webp`} alt="" />
      ))}
    </div>
  );
};
