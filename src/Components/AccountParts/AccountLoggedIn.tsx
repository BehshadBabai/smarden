import { Button, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { capitalizeFirstLetter } from '../../Utilities/Util';
import { toggleLoggedIn } from '../../Redux/features/account/account-slice';
import PatientForm from './PatientForm';

const AccountLoggedIn: React.FC = () => {
  const type = useAppSelector((state) => state.account.type);
  const dispatch = useAppDispatch();

  return (
    <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
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
            onClick={() => {
              // if logout is successful
              dispatch(toggleLoggedIn());
              // else show prompt and reason
            }}
          >
            Log Out
          </Button>
        </Col>
      </Row>
      <PatientForm />
    </Space>
  );
};

export default AccountLoggedIn;
