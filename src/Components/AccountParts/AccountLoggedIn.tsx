import { Button, Col, Row, Space, Typography, message } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { capitalizeFirstLetter } from '../../Utilities/Util';
import PatientForm from './PatientForm';
import DentistForm from './DentistFrom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { toggleLoggedIn } from '../../Redux/features/account/account-slice';

const AccountLoggedIn: React.FC = () => {
  const type = useAppSelector((state) => state.account.type);
  const [api, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  return (
    <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
      {contextHolder}
      <Row align={'middle'} justify={'space-between'}>
        <Col>
          <Typography.Text>
            Account Type: {capitalizeFirstLetter(type)}
          </Typography.Text>
        </Col>
        <Col>
          <Button
            type='primary'
            className='login-form-button'
            onClick={async () => {
              try {
                await signOut(auth);
                message.success('Log Out Successful');
                dispatch(toggleLoggedIn());
              } catch (error) {
                message.error('Log Out Failed');
              }
            }}
          >
            Log Out
          </Button>
        </Col>
      </Row>
      {type === 'patient' ? <PatientForm /> : <DentistForm />}
    </Space>
  );
};

export default AccountLoggedIn;
