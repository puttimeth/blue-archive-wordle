import "./student.select.scss";
import { Avatar, Select } from "antd";
import { StudentData } from "data";

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
        (StudentData[option?.value]?.name ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      placeholder="Student name"
      listHeight={512}
      value=""
      onChange={onChange}
      options={
        StudentData && Object.entries(StudentData).length > 0
          ? Object.entries(StudentData)
              .filter(([k, _]) => !selectedStudentsId.includes(k))
              .sort((a, b) => a[1].name.localeCompare(b[1].name))
              .map(([elementKey, elementValue]) => ({
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
        height: "42px",
        width: "min(100%, 300px)",
        position: "relative",
        zIndex: "1000",
      }}
      styles={{ popup: { root: { maxHeight: "calc(100vh - 200px)" } } }}
      notFoundContent={<span></span>}
      virtual={false}
      {...rest}
    />
  );
};
