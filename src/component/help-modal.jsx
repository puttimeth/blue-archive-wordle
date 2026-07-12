import "./help-modal.scss";
import { Divider, Modal } from "antd";
import React from "react";

export const HelpModal = ({ modalStatus, setModalStatus }) => (
  <Modal
    title={null}
    open={modalStatus}
    footer={null}
    onCancel={() => {
      setModalStatus(false);
    }}
  >
    <div className="help-panel">
      <>
        <span>
          There are 2 game modes: <b>Daily</b> and <b>Endless</b>. Daily mode
          gives you a new mystery student to find each day and reset at 19:00
          UTC (the same time as Blue Archive). In Endless mode, you can play as
          much as you want.
        </span>
        <span>
          There are 2 content categories: <b>Gameplay</b> and <b>Lore</b>.
          Gameplay provides information about in-game mechanics, while Lore
          focuses on students as characters and their backgrounds.
        </span>
        <small>
          I tried to group them using information specific to each category, but
          the Lore category will be very difficult without a 'release date'
          column, so I will keep the current format until I come up with a
          better idea.
        </small>
        <span>
          There is no scoreboard system, and I have no plan to implement it.
        </span>
        <span>
          EX Skill Costs are the costs of <b>EX Skill at level 5</b>
        </span>
        <span>
          Feel free to create an issue if you found a problem or suggest an
          improvement through Github repo provided below.
        </span>
        <Divider style={{ margin: "0" }} />
        <small>
          I created this website as a hobby and do not earn any revenue from it.
          The purpose of this site is to have fun. All assets on this website
          are the copyright of their respective authors. If you're interested in
          the source code, I open public on my{" "}
          <a
            href="https://github.com/puttimeth/blue-archive-wordle"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github repo
          </a>
        </small>
      </>
    </div>
  </Modal>
);
