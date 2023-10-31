import { MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase/firebase';
import useNotification from 'antd/es/notification/useNotification';

const ForgotPassword: React.FC = () => {
  const [resetClicked, setResetClicked] = React.useState(false);
  const [api, contextHolder] = useNotification();

  const onFinish = async (values: { email: string }) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      setResetClicked(true);
    } catch (error) {
      api.error({
        message: 'Reset Failed',
        placement: 'top',
        description: 'Failed to send the reset email, Please try again later'
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row gutter={[0, 20]} justify={'center'}>
        <Col xs={24} sm={20} md={15}>
          <Typography.Text>
            {resetClicked ? 'Reset Link Sent:' : 'Forgot Password:'}
          </Typography.Text>
        </Col>
        <Col xs={24} sm={20} md={15}>
          {resetClicked ? (
            <Typography.Text>
              We sent a link to your email with instructions to reset your
              password!
            </Typography.Text>
          ) : (
            <Form onFinish={onFinish}>
              <Form.Item
                rules={[
                  { required: true, message: 'Please input your email!' }
                ]}
                name='email'
              >
                <Input
                  prefix={<MailOutlined className='site-form-item-icon' />}
                  placeholder='Enter Your Email'
                  type='email'
                />
              </Form.Item>
              <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Reset
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
        <Col xs={24} sm={20} md={15}>
          <Link to='/'>Go Back to Login Page</Link>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
