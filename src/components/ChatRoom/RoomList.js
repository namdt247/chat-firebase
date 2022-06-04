import React, {useContext} from "react";
import {Button, Collapse, Typography} from "antd";
import {PlusSquareOutlined} from '@ant-design/icons';
import {AppContext} from "../../context/AppProvider";

const {Panel} = Collapse;

export default function RoomList() {
  const {rooms, setIsAddRoomVisible, setSelectedRoomId} = useContext(AppContext);

  const handleClick = () => {
    setIsAddRoomVisible(true);
  }

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
  }

  return (
    <div>
      <Collapse ghost defaultActiveKey={['1']}>
        <Panel header="Dang sách các phòng" key="1">
          {rooms?.map((room) =>
            <Typography.Link
              key={room.id}
              className="d-block mb-2 ps-3"
              onClick={() => handleSelectRoom(room.id)}
            >
              {room.name}
            </Typography.Link>
          )}
          <Button
            className="text-white d-flex align-items-center"
            type="text"
            icon={<PlusSquareOutlined />}
            onClick={handleClick}
          >
            Add room
          </Button>
        </Panel>
      </Collapse>
    </div>
  )
}
