import React from 'react';
import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  DentistInfo,
  changeDentistInfo
} from '../../Redux/features/dentist/dentist-slice';
import { provinces, states } from '../../Utilities/Constants';
import { addOrEditDoc, parseValues } from '../../Utilities/Util';

const DentistForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const dentistInfo = useAppSelector((state) => state.dentist.info);
  const [country, setCountry] = React.useState('Canada');
  const [provState, setProvState] = React.useState(dentistInfo?.province);
  const [loading, setLoading] = React.useState(false);
  const options = country === 'Canada' ? provinces : states;
  const [api, contextHolder] = message.useMessage();

  const onFinish = async (values: DentistInfo) => {
    setLoading(true);
    try {
      const result = parseValues(values, true, false);
      addOrEditDoc('edit', 'users', dentistInfo.id, {
        ...result,
        type: 'dentist'
      })
        .then(() => {
          message.success('Update Successful');
          dispatch(
            changeDentistInfo({
              ...result,
              id: dentistInfo.id,
              email: dentistInfo.email,
              phone: dentistInfo.phone
            } as DentistInfo)
          );
        })
        .catch(() => {
          message.error('Failed to Save Info');
        });
    } catch (error) {
      message.error('Failed to Save Info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
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
              rules={[
                {
                  required: true,
                  message: 'Please input your name!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={13}>
            <Form.Item
              name='surname'
              label='Surname'
              rules={[
                {
                  required: true,
                  message: 'Please input your surname!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} lg={11}>
            <Form.Item
              name='address1'
              label='Address Line 1'
              rules={[
                {
                  required: true,
                  message: 'Please input your address line 1!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} lg={13}>
            <Form.Item
              name='address2'
              label='Address Line 2'
              rules={[
                {
                  required: true,
                  message: 'Please input your address line 2!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col xs={24} lg={7}>
            <Form.Item
              label='Country'
              name='country'
              rules={[
                {
                  required: true,
                  message: 'Please input your country!'
                }
              ]}
            >
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
                <Select.Option value='United States'>
                  United States
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} lg={9}>
            <Form.Item
              label={country === 'Canada' ? 'Province' : 'State'}
              name='province'
              rules={[
                {
                  required: true,
                  message: 'Please input your province/state!'
                }
              ]}
            >
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
            <Form.Item
              name='postalCode'
              label='Postal Code'
              rules={[
                {
                  required: true,
                  message: 'Please input your postal code!'
                }
              ]}
            >
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
                loading={loading}
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
    </>
  );
};

export default DentistForm;
