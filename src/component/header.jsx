import "./header.scss";
import { Button } from "antd";
import React from "react";
import { MdHelpOutline } from "react-icons/md";
import { MdOutlineManageSearch } from "react-icons/md";

export const Header = ({ setHelpModalStatus, setMoreProjectModalStatus }) => {
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
            setMoreProjectModalStatus(true);
          }}
        >
          <MdOutlineManageSearch />
        </Button>
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
