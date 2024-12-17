import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Typography } from "antd";
import React from "react";
const { Title } = Typography;
import roomData from "../data/room.json";
import InnerCard from "./innerCard";

const RoomQueue: React.FC = () => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("th-TH");
  const numberOfPatientsByRoom = roomData.reduce<{ [key: number]: number }>((acc, patient) => {
    acc[patient.roomId] = (acc[patient.roomId] || 0) + 1;
    return acc;
  }, {});
  console.log(numberOfPatientsByRoom)

  return (
    <>
      <Row gutter={8} align="middle">
        <Col span={12}>
          {" "}
          <Title level={3}>วันที่ {formattedDate}</Title>
        </Col>

        <Col span={10}>
          {" "}
          <Input
            placeholder="รายได้ทั้งหมด 0.00 บาท"
            disabled
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={2}>
          {" "}
          <Button color="danger" variant="outlined">
            <ReloadOutlined />
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            bordered={false}
            style={{ minHeight: "80vh", backgroundColor: "#d7e7f4" }}
            headStyle={{
              backgroundColor: "#1cb899",
              color: "white",
              textAlign: "center",
            }}
            title={`ห้องพิเศษ present ( ` + (numberOfPatientsByRoom[Number(1)]||0)+` )`}
          >
            {roomData
              .filter((patient) => patient.roomId === 1)
              .map((patient) => (
                <InnerCard key={patient.patientCode} data={patient} />
              ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered={false}
            style={{ minHeight: "80vh", backgroundColor: "#d7e7f4" }}
            headStyle={{
              backgroundColor: "#1cb899",
              color: "white",
              textAlign: "center",
            }}
            title={`แอดมิน ( ` + (numberOfPatientsByRoom[Number(2)]||0)+` )`}
          >
            {roomData
              .filter((patient) => patient.roomId === 2)
              .map((patient) => (
                <InnerCard key={patient.patientCode} data={patient} />
              ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered={false}
            style={{ minHeight: "80vh", backgroundColor: "#cef3d2" }}
            headStyle={{
              backgroundColor: "#1cb899",
              color: "white",
              textAlign: "center",
            }}
            title={`จุดชำระเงิน ( ` + (numberOfPatientsByRoom[Number(3)]||0)+` )`}
          >
            {roomData
              .filter((patient) => patient.roomId === 3)
              .map((patient) => (
                <InnerCard key={patient.patientCode} data={patient} />
              ))}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RoomQueue;
