import { ConfigProvider, Radio } from "antd";
import { ContentCategory, GameMode, LSK } from "data";

export const GameModeRadio = ({
  contentCategory,
  setContentCategory,
  gameMode,
  setGameMode,
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
          options={Object.entries(ContentCategory).map(([_, v]) => ({
            value: v,
            label: v,
          }))}
          defaultValue={contentCategory}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => {
            setContentCategory(e.target.value);
            localStorage.setItem(LSK.selectedContentCategory, e.target.value);
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
          options={Object.entries(GameMode).map(([_, v]) => ({
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
    </div>
  );
};
