import "./header.scss";
import { Button } from "antd";
import React from "react";
import { MdHelpOutline, MdOutlineSettings } from "react-icons/md";

export const Header = ({ setConfigModalStatus, setHelpModalStatus }) => {
  return (
    <div className="header">
      <Button
        className="icon-btn config-btn"
        onClick={() => {
          setConfigModalStatus(true);
        }}
      >
        <MdOutlineSettings />
      </Button>
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
