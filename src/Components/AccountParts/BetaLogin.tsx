import React from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Row,
  Tooltip,
  message
} from 'antd';
import { AccountType } from '../../Redux/features/account/account-slice';
import { changeRoute } from '../../Redux/features/app/app-slice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseErrorCodes } from '../../Utilities/Constants';
import { useDispatch } from 'react-redux';

const BetaLogin: React.FC = () => {
  const [loginType, setLoginType] = React.useState<AccountType>(null);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Row style={{ width: '100%' }} justify={'center'} gutter={[0, 20]}>
      <Col span={24}>
        <Alert
          message='Beta Version'
          description='This is currently the beta version of this application. Select a login mode to enable logging into the application. The fake users are made for demonstration purposes and can be read/modified by anyone. Do not store your own information on these users.'
          type='warning'
          showIcon
          closable={false}
        />
      </Col>
      <Col span={24}>
        <Row style={{ width: '100%' }} justify={'center'} gutter={[20, 20]}>
          <Col xs={21} md={10}>
            <Card
              title='Patient Login'
              className='betaCard'
              headStyle={{ background: 'rgb(220, 220, 220)' }}
              onClick={() => {
                const checked = loginType && loginType === 'patient';
                if (!checked) {
                  setLoginType('patient');
                } else {
                  setLoginType(null);
                }
              }}
              extra={
                <Checkbox
                  checked={loginType && loginType === 'patient'}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setLoginType('patient');
                    } else {
                      setLoginType(null);
                    }
                  }}
                />
              }
            >
              Demonstrates the features of the application when logged in as a
              patient by logging you in with a fake patient account. Please
              don't store your own personal information as it can be
              read/modified by anyone.
            </Card>
          </Col>
          <Col xs={21} md={10}>
            <Card
              title='Dentist Login'
              className='betaCard'
              headStyle={{ background: 'rgb(220, 220, 220)' }}
              onClick={() => {
                const checked = loginType && loginType === 'dentist';
                if (!checked) {
                  setLoginType('dentist');
                } else {
                  setLoginType(null);
                }
              }}
              extra={
                <Checkbox
                  checked={loginType && loginType === 'dentist'}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setLoginType('dentist');
                    } else {
                      setLoginType(null);
                    }
                  }}
                />
              }
            >
              Demonstrates the features of the application when logged in as a
              dentist by logging you in with a fake dentist account. Please
              don't store your own personal information as it can be
              read/modified by anyone.
            </Card>
          </Col>
        </Row>
      </Col>
      <Col xs={21} md={24}>
        <Row style={{ width: '100%', paddingRight: '20px' }} justify={'center'}>
          <Tooltip
            className='betaLogin'
            title={!loginType ? 'Select a login option to proceed' : ''}
          >
            <Button
              type='primary'
              disabled={!loginType}
              loading={loginLoading}
              onClick={async () => {
                setLoginLoading(true);
                try {
                  const email =
                    loginType === 'patient'
                      ? 'betapatient@gmail.com'
                      : 'jsmith@yahoo.com';
                  const password = '111111';
                  await signInWithEmailAndPassword(auth, email, password);
                  message.success('Login Successful');
                  dispatch(changeRoute('booking'));
                  navigate('./booking');
                } catch (error) {
                  message.error(
                    error.code === firebaseErrorCodes.invalidLogin
                      ? 'Invalid Username/Password'
                      : 'Failed to Login'
                  );
                } finally {
                  setLoginLoading(false);
                }
              }}
            >
              Log in
            </Button>
          </Tooltip>
        </Row>
      </Col>
    </Row>
  );
};

export default BetaLogin;
