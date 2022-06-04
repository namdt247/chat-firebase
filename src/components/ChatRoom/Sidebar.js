import React from "react";
import {Col, Row} from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";

export default function Sidebar() {
  return (
    <div style={{
      backgroundColor: '#3f0e40',
      color: "white",
      height: '100vh',
    }}>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </div>
  )
}
