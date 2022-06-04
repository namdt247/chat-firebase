import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {Avatar, Button, Form, Tooltip, Input, message} from "antd";
import {UserAddOutlined} from '@ant-design/icons';
import Message from "./Message";
import {AppContext} from "../../context/AppProvider";
import {Alert} from "antd/es";
import {addDocument} from "../../firebase/services";
import {AuthContext} from "../../context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";

export default function ChatWindow() {
  const {selectedRoom, members, setIsInviteMemberVisible} = useContext(AppContext);
  const {user: {
    uid,
    photoURL,
    displayName,
  }} = useContext(AuthContext);

  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const condition = useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id,
  }), [selectedRoom.id])

  const messages = useFirestore('messages', condition);

  const handleInviteMember = () => {
   setIsInviteMemberVisible(true);
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = () => {
    if (inputValue) {
      addDocument('messages', {
        text: inputValue,
        uid,
        photoURL,
        displayName,
        roomId: selectedRoom.id,
      })
      setInputValue('');
      form.resetFields();

      if (inputRef?.current) {
        setTimeout(() => {
          inputRef.current.focus();
        });
      }
    } else {
      message.warning('Please enter message');
    }
  }

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      {selectedRoom.id ? (
        <>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              height: 56,
              padding: '0px 16px',
              borderBottom: '1px solid rgb(230, 230, 230)',
            }}
          >
            <div className="d-flex flex-column justify-content-center">
              <p className="m-0 fw-bold">
                {selectedRoom.name}
              </p>
              <span
                style={{
                  fontSize: '12px',
                }}
              >
                {selectedRoom.description}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={handleInviteMember}
              >
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={2} className="ms-1">
              {
                members?.map((member) =>
                  <Tooltip key={member.uid} title={member.displayName}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL ? '' : member.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                )
              }
              </Avatar.Group>
            </div>
          </div>
          <div
            className="d-flex flex-column justify-content-end p-3"
            style={{
              height: 'calc(100vh - 56px)',
            }}
          >
            <div
              style={{
                maxHeight: '100%',
                overflowY: 'auto',
              }}
              ref={messageListRef}
            >
              {messages?.map((mes) =>
                <Message
                  key={mes.id}
                  text={mes.text}
                  displayName={mes.displayName}
                  createdAt={mes.createdAt?.seconds}
                  photoURL={mes.photoURL}
                />
              )}
            </div>
            <div>
              <Form
                form={form}
                className="d-flex justify-content-between align-items-center"
                style={{
                  padding: '1px',
                  border: '1px solid rgb(230, 230, 230)',
                  borderRadius: '2px',
                }}
              >
                <Form.Item className="mb-0 w-100" name="message">
                  <Input
                    ref={inputRef}
                    onChange={handleInputChange}
                    onPressEnter={handleSubmit}
                    placeholder="Enter content"
                    bordered={false}
                    autoComplete="off"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                >
                  Gửi
                </Button>
              </Form>
            </div>
          </div>
        </>
      ) : (
        <Alert
          message="Select room"
          type='info'
          showIcon
          className="mx-2"
        />
      )}
    </div>
  )
}
