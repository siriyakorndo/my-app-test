import { Col, Row } from "antd";
import "./App.css";
import { ClockCircleFilled, CloseOutlined, EditFilled, PhoneFilled, PrinterOutlined, SmileOutlined } from "@ant-design/icons";
import fake from './data/fake.json';
import ScheduleTable from "./components/table";
import RoomQueue from "./components/roomQueue";

interface Person {
  id: number;
  name: string;
}

function App() {
  // const rowClassName = (record: DataType, index: number): string => {
  //   return index % 2 === 0 ? 'even-row' : 'odd-row';
  // };


  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={10}>
        <ScheduleTable/>
        </Col>
        <Col span={14}>
        <RoomQueue/>
        </Col>
      </Row>
      <ul>
        {/* Map through the imported data */}
        {fake.map((person: Person) => (
          <li key={person.id}>
            {person.name}
          </li>
        ))}
      </ul>
          <PrinterOutlined />
          <CloseOutlined />
          <PhoneFilled />
          <EditFilled />
          <ClockCircleFilled />
          <SmileOutlined />
    </>
  );
}

export default App;
