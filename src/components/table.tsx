import React from "react";
import { Table, Row, Col, Select } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";
// Define types for task and time slot
// import "../../public/images/1.png";
interface ScheduleTask {
  task: string;
  startTime: string;
  endTime: string;
}

// Your task data with specific time slots
const scheduleData: ScheduleTask[] = [
  { task: "Team Meeting", startTime: "09:00", endTime: "09:45" },
  { task: "Project Discussion", startTime: "10:30", endTime: "11:30" },
  { task: "Client Call", startTime: "12:00", endTime: "13:00" },
  { task: "Lunch Break", startTime: "13:00", endTime: "14:00" },
  { task: "Code Review", startTime: "15:00", endTime: "16:00" },
  { task: "Wrap Up", startTime: "17:00", endTime: "17:30" },
];

// Helper function to convert time (HH:MM) to minutes since midnight
const convertToMinutes = (time: string): number => {
  const [hour, minute] = time.split(":").map((str) => parseInt(str, 10));
  return hour * 60 + minute;
};

// Generate every 15-minute interval from 09:00 AM to 07:00 PM
const generateTimeSlots = (): { time: string }[] => {
  const timeSlots: { time: string }[] = [];
  let startTime = 9 * 60; // Start at 09:00 AM (9 * 60 minutes)
  const endTime = 19 * 60; // End at 07:00 PM (19 * 60 minutes)

  while (startTime <= endTime) {
    const hours = Math.floor(startTime / 60);
    const minutes = startTime % 60;
    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`;
    timeSlots.push({ time: formattedTime });
    startTime += 15; // Increment by 15 minutes
  }

  return timeSlots;
};

const timeSlots = generateTimeSlots();

const ScheduleTable: React.FC = () => {
  // Map scheduleData to a lookup for quick task assignment
  const taskLookup = scheduleData.map(({ task, startTime, endTime }) => ({
    task,
    startMinutes: convertToMinutes(startTime),
    endMinutes: convertToMinutes(endTime),
  }));

  const options = [
    { value: "lucy", label: "Lucy (101)" },
    { value: "jack", label: "Jack (102)" },
    { value: "tom", label: "Tom (103)" },
  ];
  // Merge the time slots with the tasks
  const dataSource = timeSlots.map((slot) => {
    const slotMinutes = convertToMinutes(slot.time);
    const task = taskLookup.find(
      (t) => t.startMinutes <= slotMinutes && t.endMinutes > slotMinutes
    );
    return {
      key: slot.time,
      time: slot.time,
      task: task ? task.task : "",
    };
  });

  // Define table columns
  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text: string) => <span>{text}</span>,
      width:"10%"
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: (text: string) => <span>{text || "-"}</span>,
    },
  ];
  //   const rowClassName = (record: ScheduleTask, index: number): string => {
  //     return index % 2 === 0 ? 'even-row' : 'odd-row';
  //   };
  const onChange = (value: { value: string; label: string }) => {
    console.log(`Selected: ${value}`);
  };

  const onSearch = (searchText: string) => {
    console.log(`Search: ${searchText}`);
  };
  return (
    <div>
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Select
            labelInValue
            showSearch
            onChange={onChange}
            onSearch={onSearch}
            defaultValue={{ value: "lucy", label: "Lucy (101)" }}
            options={options}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={24}>
          <div
            style={{
              padding: 12,
              fontWeight: "bold",
              backgroundColor: "#2e4068",
              color: "#fff",
              borderRadius: "10px",
              justifyContent: "space-between",

              display: "flex", // Use flexbox to align elements horizontally
              alignItems: "center", // Vertically center the items (text and image)
            }}
          >
            <span style={{ marginRight: 10 }}>ทันตแพทย์</span>{" "}
            {/* Space between text and image */}
            <img
              src={`../../public/images/1.png`}
              alt="Doctor"
              style={{
                borderRadius: "50%",
                width: 30,
                height: 30, // To ensure it's perfectly circular
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#9cdccb",
              color: "white",
              padding: 5,
              borderRadius: "5px",
            }}
          >
            <ClockCircleFilled style={{ margin: 2 }} />
            เวลาเข้างาน 09.00 - 19.00 น.
          </div>
        </Col>
        <Col span={24}>
          <Table
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            showHeader={false}
            // rowClassName={rowClassName}
            // bordered
            scroll={{ x:"max-content" ,y: 'calc(100vh - 160px)' }} 
            style={{ width: "100%" }}

          />
        </Col>
      </Row>
    </div>
  );
};

export default ScheduleTable;
