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
  Typography
} from 'antd';

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

const onFinish = (values: any) => {
  // send email later on
  console.log(values);
};

const FeedBack: React.FC = () => (
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
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </Space>
);

export default FeedBack;
