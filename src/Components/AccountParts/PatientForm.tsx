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
  Typography
} from 'antd';
import {
  AccountInfo,
  changeInfo,
  toggleHasAccount,
  toggleLoggedIn
} from '../../Redux/features/account/account-slice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import dayjs from 'dayjs';

const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';

const PatientForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.account);

  const onFinish = (values: AccountInfo) => {
    if (!account.loggedIn) {
      // change db first and signup user
      dispatch(toggleHasAccount());
      dispatch(toggleLoggedIn());
      dispatch(changeInfo(values));
    } else {
      // change db first
      dispatch(changeInfo(values));
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
    <Form
      form={form}
      name='register'
      onFinish={onFinish}
      scrollToFirstError
      initialValues={
        account.loggedIn
          ? {
              ...account?.info,
              prefix: 1,
              dob: account?.info?.dob
                ? dayjs(account.info.dob, dateFormat)
                : null
            }
          : { prefix: 1, province: 'ab' }
      }
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
                  { required: true, message: 'Please input your phone number!' }
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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
                  }
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
            <DatePicker style={{ width: '100%' }} />
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
        {!account.loggedIn ? (
          <Row justify={'center'}>
            <Space direction='vertical' size={'large'}>
              <Row justify={'center'}>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
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
        )}
      </Form.Item>
    </Form>
  );
};

export default PatientForm;
