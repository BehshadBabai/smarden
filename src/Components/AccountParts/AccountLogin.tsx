import React from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import AccountSignUp from './AccountSignUp';
import { toggleHasAccount } from '../../Redux/features/account/account-slice';
import { changeRoute } from '../../Redux/features/app/app-slice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseErrorCodes } from '../../Utilities/Constants';
import { Link } from 'react-router-dom';

const AccountLogin: React.FC = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [api, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values?.email, values?.password);
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
  };

  return account.hasAccount ? (
    <Space direction='vertical' size={'large'} style={{ width: '85%' }}>
      {contextHolder}
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
            type='email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Row justify={'space-between'}>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className='login-form-forgot' to='./forgotpassword'>
              Forgot password
            </Link>
          </Row>
        </Form.Item>

        <Form.Item>
          <Row justify={'center'}>
            <Space direction='vertical' size={'large'}>
              <Row justify={'center'}>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Log in
                </Button>
              </Row>
              <div>
                <Typography.Text>Don't have an account?</Typography.Text>
                <Button
                  type='link'
                  className='login-form-button'
                  style={{ fontWeight: 'bold' }}
                  onClick={() => {
                    dispatch(toggleHasAccount());
                  }}
                  loading={loginLoading}
                >
                  Register
                </Button>
              </div>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </Space>
  ) : (
    <AccountSignUp />
  );
};

export default AccountLogin;
