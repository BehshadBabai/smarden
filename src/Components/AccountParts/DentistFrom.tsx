import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  DentistInfo,
  changeDentistInfo
} from '../../Redux/features/dentist/dentist-slice';

const DentistForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);
  const dentistInfo = useAppSelector((state) => state.dentist.info);

  const onFinish = (values: DentistInfo) => {
    // on save, change db first
    dispatch(changeDentistInfo(values));
  };

  return (
    <Form
      form={form}
      name='update'
      onFinish={onFinish}
      scrollToFirstError
      initialValues={dentistInfo}
    >
      <Row gutter={10}>
        <Col xs={24} md={11}>
          <Form.Item
            name='name'
            label='Name'
            rules={
              account.loggedIn
                ? []
                : [
                    {
                      required: true,
                      message: 'Please input your name!'
                    }
                  ]
            }
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={13}>
          <Form.Item
            name='surname'
            label='Surname'
            rules={
              account.loggedIn
                ? []
                : [
                    {
                      required: true,
                      message: 'Please input your surname!'
                    }
                  ]
            }
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Form.Item name='address1' label='Address Line 1'>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Form.Item name='address2' label='Address Line 2'>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col xs={24} md={9}>
          <Form.Item label='Country'>
            <Select defaultValue={'canada'}>
              <Select.Option value='canada'>Canada</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={7}>
          <Form.Item label='Province' name='province'>
            <Select>
              <Select.Option value='ab'>AB</Select.Option>
              <Select.Option value='bc'>BC</Select.Option>
              <Select.Option value='mb'>MB</Select.Option>
              <Select.Option value='nb'>NB</Select.Option>
              <Select.Option value='nl'>NL</Select.Option>
              <Select.Option value='nt'>NT</Select.Option>
              <Select.Option value='ns'>NS</Select.Option>
              <Select.Option value='ny'>NY</Select.Option>
              <Select.Option value='on'>ON</Select.Option>
              <Select.Option value='pe'>PE</Select.Option>
              <Select.Option value='qc'>QC</Select.Option>
              <Select.Option value='sk'>SK</Select.Option>
              <Select.Option value='yt'>YT</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item name='postalCode' label='Postal Code'>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row justify={'center'} gutter={20}>
          <Col>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button
              type='default'
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default DentistForm;
