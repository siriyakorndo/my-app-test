import React, { useState } from "react";
import { Table, Row, Col, Select, Modal } from "antd";
import {
  ClockCircleFilled,
  EditFilled,
  PhoneFilled,
  PrinterOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import doctorData from "../data/fakeDoctor.json";
import meetingData from "../data/meetingDetail.json";

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
  const [selectDoctor, setSelectDoctor] = useState("D001");
  const [selectDoctorName, setSelectDoctorName] = useState("Dr. Jenny Smith");
  const [selectedMeeting, setSelectedMeeting] = useState<
    MeetingData | undefined
  >(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const scheduleTasks = meetingData.map((meeting: MeetingData) => ({
    task: `${meeting.patient.name} | ${meeting.service} | ${meeting.patient.id} <br/> ${meeting.patient.tel} | ${meeting.startTime} - ${meeting.endTime} `, // The service name is mapped to task
    startTime: meeting.startTime,
    endTime: meeting.endTime,
    doctorId: meeting.doctorId,
    meetingId: meeting.meetingId,
  }));

  const taskLookup = scheduleTasks
    .filter((meeting) => meeting.doctorId === selectDoctor)
    .map(({ task, startTime, endTime, meetingId }) => {
      const startMinutes = convertToMinutes(startTime);
      const endMinutes = convertToMinutes(endTime);
      const duration = endMinutes - startMinutes;
      return {
        task,
        startMinutes,
        endMinutes,
        duration,
        rowspan: duration > 15 ? duration / 15 : 1,
        meetingId,
      };
    });

  const dataSource = timeSlots.map((slot) => {
    const slotMinutes = convertToMinutes(slot.time);
    const task = taskLookup.find(
      (t) => t.startMinutes <= slotMinutes && t.endMinutes > slotMinutes
    );
    return {
      key: slot.time,
      time: slot.time,
      task: task ? task.task : "",
      rowspan: task ? task.rowspan : 1,
      meetingId: task ? task.meetingId : "",
    };
  });

  const getMeetingById = (id: string): void => {
    const result = meetingData.find((meeting) => meeting.meetingId === id);
    setSelectedMeeting(result);
  };

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text: string) => <span>{text}</span>,
      width: "10%",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: (text: string, record: { meetingId: string }) => (
        <span
          dangerouslySetInnerHTML={{
            __html: `${text || " "}`,
          }}
          onClick={() => {
            getMeetingById(record.meetingId);
            showModal();
          }}
        />
      ),
    },
  ];

  const options = doctorData.map((doctor) => ({
    value: doctor.id,
    label: `${doctor.doctorName}`,
  }));

  const onChange = (value: { value: string; label: string }) => {
    setSelectDoctor(value.value);
    setSelectDoctorName(value.label);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Select
            labelInValue
            showSearch
            onChange={onChange}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase()) ?? false
            }
            defaultValue={{ value: "D001", label: "คุณหมอ Jenny Smith" }}
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
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: 10 }}>ทันตแพทย์</span>{" "}
            {/* Space between text and image */}
            <img
              src={`../../public/images/` + selectDoctor + `.png`}
              alt="Doctor"
              style={{
                borderRadius: "50%",
                width: 30,
                height: 30,
                backgroundColor: "#fff",
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
            scroll={{ x: "max-content", y: "calc(100vh - 160px)" }}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      <Modal centered open={isModalOpen} onCancel={handleCancel} footer={false}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
            alignItems: "center",
          }}
        >
          <div
            style={{ color: "#21b498", fontWeight: "bold", fontSize: "18px" }}
          >
            {" "}
            นัดหมาย <br />
            ทันตแพทย์ {selectDoctorName}
          </div>
          <img
            src={`../../public/images/` + selectDoctor + `.png`}
            alt="Doctor"
            style={{
              borderRadius: "50%",
              width: 40,
              height: 40,
              backgroundColor: "#fff",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div style={{ paddingLeft: "10px", marginTop: "5px" }}>
            <div>
              <UserOutlined style={{ color: "#21b498", fontSize: "18px" }} />{" "}
              {selectedMeeting?.patient.name}
            </div>
            <div>
              <SmileOutlined style={{ color: "#21b498", fontSize: "18px" }} />{" "}
              {selectedMeeting?.service}
            </div>
            <div>
              <PhoneFilled style={{ color: "#21b498", fontSize: "18px" }} />{" "}
              {selectedMeeting?.patient.tel}
            </div>
            <div>ประเมินค่าใช้จ่าย 0.00</div>
            <div>
              <ClockCircleFilled
                style={{ color: "#21b498", fontSize: "18px" }}
              />{" "}
              {selectedMeeting?.startTime} - {selectedMeeting?.endTime} น.
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <PrinterOutlined
              style={{ color: "#21b498", fontSize: "24px", padding: "10px" }}
            />
            <EditFilled
              style={{ color: "#21b498", fontSize: "24px", padding: "10px" }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ScheduleTable;
