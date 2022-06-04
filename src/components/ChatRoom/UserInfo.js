import React, {useContext} from "react";
import {Avatar, Button, Typography} from "antd";
import {auth} from "../../firebase/config";
import {AuthContext} from "../../context/AuthProvider";

export default function UserInfo() {
  const {user: {
    displayName,
    photoURL,
  }} = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  }

  return (
    <div
      className="d-flex justify-content-between"
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(82, 38, 83)',
      }}
    >
      <div className="d-flex align-items-center">
        <Avatar src={photoURL}>{photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <Typography.Text className="text-white ms-2">
          {displayName}
        </Typography.Text>
      </div>
      <Button
        ghost
        onClick={handleLogout}
      >
        Đăng xuất
      </Button>
    </div>
  )
}
