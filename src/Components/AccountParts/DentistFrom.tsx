import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  DentistInfo,
  changeDentistInfo
} from '../../Redux/features/dentist/dentist-slice';
import { provinces, states } from '../../Utilities/Constants';

const DentistForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);
  const dentistInfo = useAppSelector((state) => state.dentist.info);
  const [country, setCountry] = React.useState('Canada');
  const [provState, setProvState] = React.useState(dentistInfo?.province);
  const options = country === 'Canada' ? provinces : states;

  const onFinish = (values: DentistInfo) => {
    // on save, change db first
    dispatch(
      changeDentistInfo({
        ...values,
        country: country,
        province: provState,
        id: dentistInfo.id
      })
    );
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
      <Row gutter={10}>
        <Col xs={24} lg={11}>
          <Form.Item name='address1' label='Address Line 1'>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} lg={13}>
          <Form.Item name='address2' label='Address Line 2'>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col xs={24} lg={7}>
          <Form.Item label='Country'>
            <Select
              value={country}
              onChange={(newValue) => {
                if (newValue === 'Canada') {
                  setProvState('Alberta');
                } else {
                  setProvState('Alabama');
                }
                setCountry(newValue);
              }}
            >
              <Select.Option value='Canada'>Canada</Select.Option>
              <Select.Option value='United States'>United States</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={9}>
          <Form.Item label='Province'>
            <Select
              value={provState}
              onChange={(newValue) => {
                setProvState(newValue);
              }}
            >
              {options.map((option) => (
                <Select.Option value={option} key={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
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
              className='defaultButton'
              onClick={() => {
                form.resetFields();
                setProvState(dentistInfo?.province);
                setCountry(dentistInfo?.country);
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
