import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Rate,
  Row,
  Select,
  Space,
  Typography,
  notification
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!'
  },
  number: {
    range: '${label} must be between ${min} and ${max}'
  }
};

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

const FeedBack: React.FC = () => {
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification();
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const onFinish = (values: any) => {
    setSubmitLoading(true);
    axios
      .post('https://email-server-x5ax.onrender.com/sendemail', {
        data: {
          name: values?.user?.name,
          email: values?.user?.email,
          message: values?.user?.message || '(Left Empty)',
          usage: values?.usage,
          rate: String(values?.rate)
        },
        type: 'sendgrid',
        EMAIL_API_KEY: process.env.EMAIL_API_KEY,
        EMAIL_TO: process.env.EMAIL_TO,
        EMAIL_FROM: process.env.EMAIL_FROM,
        TEMPLATE_ID: process.env.TEMPLATE_ID
      })
      .then((response) => {
        if (response.data.status === 'success') {
          api['success']({
            message: 'Success',
            description: 'We Received your feedback, Thank you!',
            placement: 'top'
          });
          form.resetFields();
        } else {
          api['error']({
            message: 'Error',
            description:
              'Failed to send your feedback, Please try again later!',
            placement: 'top'
          });
        }
      })
      .catch((_error) => {
        api['error']({
          message: 'Error',
          description: 'Failed to send your feedback, Please try again later!',
          placement: 'top'
        });
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  return (
    <>
      {contextHolder}
      <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
        <Row justify={'center'}>
          <Col xs={24} md={19} lg={14} style={{ width: '90%' }}>
            <Row>
              <Col span={5}></Col>
              <Col span={19}>
                <Typography.Text
                  style={{
                    textAlign: 'center',
                    fontSize: '1.1em'
                  }}
                >
                  Share Your Feedback With Us:
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col xs={24} md={19} lg={14}>
            <Form
              {...layout}
              form={form}
              name='nest-messages'
              onFinish={onFinish}
              validateMessages={validateMessages}
              initialValues={{ usage: 'patient', rate: 1 }}
            >
              <Form.Item
                name={['user', 'name']}
                label='Name'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'email']}
                label='Email'
                rules={[{ type: 'email', required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name='usage' label='Usage'>
                <Select>
                  <Option value='patient'>Patient</Option>
                  <Option value='dentist'>Dentist</Option>
                  <Option value='other'>Other</Option>
                </Select>
              </Form.Item>
              <Form.Item name='rate' label='Rating'>
                <Rate allowClear={false} />
              </Form.Item>
              <Form.Item name={['user', 'message']} label='Message'>
                <Input.TextArea style={{ height: '200px' }} />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Row>
                  <Col xs={{ span: 0 }} sm={{ span: 5 }}></Col>
                  <Col xs={{ span: 24 }} sm={{ span: 19 }}>
                    <Button
                      type='primary'
                      htmlType='submit'
                      loading={submitLoading}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default FeedBack;
