import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  message
} from 'antd';
import {
  changeType,
  toggleHasAccount
} from '../../Redux/features/account/account-slice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import dayjs from 'dayjs';
import {
  PatientInfo,
  changePatientInfo
} from '../../Redux/features/patient/patient-slice';
import { useNavigate } from 'react-router-dom';
import { changeRoute } from '../../Redux/features/app/app-slice';
import { provinces, states } from '../../Utilities/Constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { addOrEditDoc, parseValues } from '../../Utilities/Util';

const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';

const PatientForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);
  const patientInfo = useAppSelector((state) => state.patient.info);
  const [country, setCountry] = React.useState('Canada');
  const [provState, setProvState] = React.useState(patientInfo?.province);
  const [api, contextHolder] = message.useMessage();
  const options = country === 'Canada' ? provinces : states;

  const onFinish = async (values: any) => {
    if (values?.dob) {
      values.dob = values.dob.format('YYYY-MM-DD');
    }
    if (provState) {
      values.province = provState;
    }
    setLoading(true);
    // update dob date field of values
    if (!account.loggedIn) {
      try {
        const credentials = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const result = parseValues(values, false, true);
        addOrEditDoc('add', 'users', credentials.user.uid, {
          ...result,
          type: 'patient',
          dentists: []
        })
          .then(() => {
            message.success('Registration Successful');
            dispatch(changeType('patient'));
            dispatch(toggleHasAccount());
            dispatch(
              changePatientInfo({
                ...result,
                id: credentials.user.uid,
                email: values.email,
                phone: result.phone
              })
            );
            dispatch(changeRoute('booking'));
            navigate('./booking');
          })
          .catch(() => {
            message.error('Something went wrong, Please try again later');
          });
      } catch (error) {
        message.error(
          error.code === 'auth/email-already-in-use'
            ? 'Existing email detected, Please Login with your Password'
            : 'Registration Failed'
        );
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const result = parseValues(values, true, true);
        addOrEditDoc('edit', 'users', patientInfo.id, {
          ...result,
          type: 'patient'
        })
          .then(() => {
            message.success('Update Successful');
            dispatch(
              changePatientInfo({
                ...result,
                id: patientInfo.id,
                email: patientInfo.email,
                phone: patientInfo.phone
              })
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
    }
  };

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select style={{ width: 70 }}>
        <Option value='1'>+1</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name='register'
        onFinish={onFinish}
        scrollToFirstError
        initialValues={
          account.loggedIn
            ? {
                ...patientInfo,
                prefix: 1,
                dob: patientInfo.dob ? dayjs(patientInfo.dob, dateFormat) : null
              }
            : { prefix: 1, province: 'Alberta', country: 'Canada' }
        }
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

        {!account.loggedIn && (
          <>
            {' '}
            <Row gutter={10}>
              <Col xs={24} md={11}>
                <Form.Item
                  name='email'
                  label='E-mail'
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={13}>
                <Form.Item
                  name='phone'
                  label='Phone'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!'
                    }
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col xs={24} md={11}>
                <Form.Item
                  name='password'
                  label='Password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password').length > 5) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'The password must be a minimum of 6 characters!'
                          )
                        );
                      }
                    })
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24} md={13}>
                <Form.Item
                  name='confirm'
                  label='Confirm Password'
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'The new password that you entered do not match!'
                          )
                        );
                      }
                    })
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        <Row gutter={10}>
          <Col xs={24} md={11}>
            <Form.Item name='gender' label='Gender'>
              <Select placeholder='select your gender'>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
                <Option value='other'>Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={13}>
            <Form.Item label='Date of Birth' name='dob'>
              <DatePicker
                style={{ width: '100%' }}
                disabledDate={(current) => {
                  return current && current.valueOf() > Date.now();
                }}
              />
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
          <Col xs={24} lg={7}>
            <Form.Item label='Country' name='country'>
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
            <Form.Item label={country === 'Canada' ? 'Province' : 'State'}>
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
          {!account.loggedIn ? (
            <Row justify={'center'}>
              <Space direction='vertical' size={'large'}>
                <Row justify={'center'}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    loading={loading}
                  >
                    Register
                  </Button>
                </Row>
                <div>
                  <Typography.Text>Already have an account?</Typography.Text>
                  <Button
                    type='link'
                    className='login-form-button'
                    style={{ fontWeight: 'bold' }}
                    onClick={() => {
                      dispatch(toggleHasAccount());
                    }}
                  >
                    Login
                  </Button>
                </div>
              </Space>
            </Row>
          ) : (
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
                    setProvState(patientInfo?.province);
                    setCountry(patientInfo?.country);
                  }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default PatientForm;
