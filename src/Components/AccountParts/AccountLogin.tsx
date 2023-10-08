import React from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import AccountSignUp from './AccountSignUp';
import AccountRadio from './AccountRadio';
import {
  toggleHasAccount,
  toggleLoggedIn
} from '../../Redux/features/account/account-slice';

const AccountLogin: React.FC = () => {
  const hasAccount = useAppSelector((state) => state.account.hasAccount);
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    // if (login successfull)
    dispatch(toggleLoggedIn());
    // else, show prompt with reason
    console.log('Received values of form: ', values);
  };

  return hasAccount ? (
    <Space direction='vertical' size={'large'} style={{ width: '85%' }}>
      <AccountRadio text='Login' />
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
          <Input
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

            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
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
