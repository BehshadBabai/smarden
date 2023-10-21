import React from 'react';
import { Radio, RadioChangeEvent, Space, Typography } from 'antd';
import DentistSignup from './DentistSignup';
import PatientForm from './PatientForm';

const AccountSignUp: React.FC = () => {
  const [regType, setRegType] = React.useState('patient');
  const onChange = (e: RadioChangeEvent) => {
    setRegType(e.target.value);
  };

  return (
    <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
      <Space direction='horizontal' size={'small'}>
        <Typography.Text>Register As:</Typography.Text>
        <Radio.Group
          defaultValue={regType}
          buttonStyle='solid'
          onChange={onChange}
        >
          <Radio value='patient'>Patient</Radio>
          <Radio value='dentist'>Dentist</Radio>
        </Radio.Group>
      </Space>
      {regType === 'dentist' ? <DentistSignup /> : <PatientForm />}
    </Space>
  );
};

export default AccountSignUp;
