import { Col, Row } from "antd";
import "./App.css";
import ScheduleTable from "./components/table";
import RoomQueue from "./components/roomQueue";


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
    </>
  );
}

export default App;
