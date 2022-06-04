import React from "react";
import {Button, Col, Row, Typography} from 'antd';
import firebase, {auth} from '../../firebase/config';
import {addDocument, generateKeywords} from "../../firebase/services";
import {useHistory} from 'react-router-dom';

const {Title} = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const history = useHistory();

  const handleLogin = async (provider) => {
    const {additionalUserInfo, user} = await auth.signInWithPopup(provider);

    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });

      history.push('/');
    }
  }

  return (
    <div>
      <Row
        className="justify-content-center"
        style={{
          height: 800,
        }}
      >
        <Col span={8}>
          <Title
            className="text-center text-uppercase"
            level={3}
          >
            Funny chat
          </Title>
          <div className="d-flex justify-content-center">
            <Button
              className="mb-4 btn btn-outline-primary d-flex align-items-center"
              onClick={() => handleLogin(ggProvider)}
            >
              Đăng nhập bằng google
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              className="btn btn-outline-primary d-flex align-items-center"
              onClick={() => handleLogin(fbProvider)}
            >
              Đăng nhập bằng facebook
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
