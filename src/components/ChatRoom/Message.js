import React from "react";
import {Avatar, Typography} from "antd";
import {formatRelative} from 'date-fns';

export default function Message(props) {
  const {text, displayName, createdAt, photoURL} = props;

  const formatDate = (createdAt) => {
    let fmDate = '';

    if (createdAt) {
      fmDate = formatRelative(new Date(createdAt * 1000), new Date());
    }
    fmDate = fmDate.charAt(0).toUpperCase() + fmDate.slice(1);
    return fmDate;
  }

  return (
    <div className="mb-2">
      <div>
        <Avatar size='small' src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="ms-2 fw-bold">
          {displayName}
        </Typography.Text>
        <Typography.Text
          className="ms-2"
          style={{
            fontSize: '11px',
            color: '#a7a7a7',
          }}
        >
          {formatDate(createdAt)}
        </Typography.Text>
      </div>
      <div
        style={{
          paddingLeft: '32px',
        }}
      >
        <Typography.Text>
          {text}
        </Typography.Text>
      </div>
    </div>
  )
}
