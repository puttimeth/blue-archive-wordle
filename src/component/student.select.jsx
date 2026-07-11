import "./student.select.scss";
import { Avatar, Select } from "antd";
import { studentData } from "data";

export const StudentSelect = ({
  selectedStudentsId = [],
  onChange = (e) => {},
  ...rest
}) => {
  return (
    <Select
      className="student-select"
      showSearch={true}
      filterOption={(input, option) =>
        (studentData[option?.value]?.name ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      placeholder="Student name"
      listHeight={512}
      value=""
      onChange={onChange}
      options={
        studentData && Object.entries(studentData).length > 0
          ? Object.entries(studentData)
              .filter(([k, _]) => !selectedStudentsId.includes(k))
              .map(([elementKey, elementValue], idx) => ({
                key: `student-option-${elementKey}`,
                value: elementKey,
                label: (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Avatar
                      src={`/students/${elementKey}.webp`}
                      style={{
                        // backgroundColor:
                        //   BankInputLogoBackgroundColor[elementKey] ?? "#1f1f1f",
                        borderRadius: "5px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <span
                      style={{
                        width: "90%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {elementValue.name}
                    </span>
                  </div>
                ),
              }))
          : []
      }
      style={{
        height: "58px",
        width: "min(100%, 500px)",
        position: "relative",
        zIndex: "1000",
      }}
      dropdownStyle={{ maxHeight: "calc(100vh - 200px)" }}
      notFoundContent={<span></span>}
      virtual={false}
      {...rest}
    />
  );
};
