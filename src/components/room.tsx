import {
  ReloadOutlined,
  ShareAltOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, Input, Row, Typography } from "antd";
import React from "react";
const { Title } = Typography;

const RoomQueue: React.FC = () => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("th-TH");
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
            title="ห้องพิเศษ present (0)"
          ></Card>
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
            title="แอดมิน (1)"
          ></Card>
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
            title="จุดชำระเงิน (1)"
          >
            <Card type="inner">
            <div
                style={{
                  justifyContent: "space-between",
                }}
              >
                  <span
                    style={{
                      backgroundColor: "orange",
                      padding: "7px",
                      borderRadius: "50%",
                    }}
                  >
                    {" "}
                    01{" "}
                  </span>

                  <span
                    style={{
                      backgroundColor: "orange",
                      padding: "7px",
                      borderRadius: "50%",
                    }}
                  >
                    {" "}
                    01{" "}
                  </span>

              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>

                  <Avatar
                    size={48}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#f0f2f5", color: "#595959" }}
                  />{" "}
                </div>

                <div>
                  <p>ชื่อคนไข้</p> <p>รหัส</p>{" "}
                </div>
                <div>
                  <span style={{ backgroundColor: "pink", padding: "10px" }}>
                    05
                  </span>
                  <ShareAltOutlined />
                  <StopOutlined style={{ color: "red", fontSize: "16px" }} />
                </div>
              </div>
            </Card>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RoomQueue;
