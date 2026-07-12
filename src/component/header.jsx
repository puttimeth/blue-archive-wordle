import "./header.scss";
import { Button } from "antd";
import React from "react";
import { MdHelpOutline } from "react-icons/md";

export const Header = ({ setHelpModalStatus }) => {
  return (
    <div className="header">
      <div></div>
      <div>
        <span>Guess student</span>
      </div>
      <div>
        <Button
          className="icon-btn"
          onClick={() => {
            setHelpModalStatus(true);
          }}
        >
          <MdHelpOutline />
        </Button>
      </div>
    </div>
  );
};
