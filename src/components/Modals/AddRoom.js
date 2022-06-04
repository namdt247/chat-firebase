import React, {useContext} from "react";
import {Form, Input, Modal} from "antd";
import {AppContext} from "../../context/AppProvider";
import {addDocument} from "../../firebase/services";
import {AuthContext} from "../../context/AuthProvider";

export default function AddRoom() {
  const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
  const {user: {uid}} = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    addDocument('rooms', {...form.getFieldsValue(), members: [uid]});
    form.resetFields();
    setIsAddRoomVisible(false);
  }

  const handleCancel = () => {
    setIsAddRoomVisible(false);
  }

  return (
    <div>
      <Modal
        title="Create room"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label="Room name" name="name">
            <Input placeholder="Enter room name"/>
          </Form.Item>
          <Form.Item label="Description name" name="description">
            <Input.TextArea placeholder="Enter room description"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
