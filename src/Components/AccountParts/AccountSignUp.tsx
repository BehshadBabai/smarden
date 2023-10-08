import React from 'react';
import { useAppSelector } from '../../Redux/hooks';
import AccountRadio from './AccountRadio';
import { Space } from 'antd';
import DentistSignup from './DentistSignup';
import PatientForm from './PatientForm';

const AccountSignUp: React.FC = () => {
  const accountType = useAppSelector((state) => state.account.type);

  return (
    <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
      <AccountRadio text='Register' />
      {accountType === 'dentist' ? <DentistSignup /> : <PatientForm />}
    </Space>
  );
};

export default AccountSignUp;
