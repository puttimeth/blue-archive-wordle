import { ConfigProvider, Radio } from "antd";
import { GuessGameMode, GuessPlayMode, LSK } from "data";

export const GameModeRadio = ({
  gameMode,
  setGameMode,
  playMode,
  setPlayMode,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#272727",
          },
        }}
      >
        <Radio.Group
          block
          options={Object.entries(GuessGameMode).map(([_, v]) => ({
            value: v,
            label: v,
          }))}
          defaultValue={gameMode}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => {
            setGameMode(e.target.value);
            localStorage.setItem(LSK.selectedGameMode, e.target.value);
          }}
        />
      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#18006e",
          },
        }}
      >
        <Radio.Group
          block
          options={Object.entries(GuessPlayMode).map(([_, v]) => ({
            value: v,
            label: v,
          }))}
          defaultValue={playMode}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => {
            setPlayMode(e.target.value);
            localStorage.setItem(LSK.selectedPlayMode, e.target.value);
          }}
        />
      </ConfigProvider>
    </div>
  );
};
