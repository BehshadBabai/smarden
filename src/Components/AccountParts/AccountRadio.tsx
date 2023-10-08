import React from 'react';
import { Radio, RadioChangeEvent, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { toggleType } from '../../Redux/features/account/account-slice';

const AccountRadio: React.FC<{ text: string }> = ({ text }) => {
  const dispatch = useAppDispatch();
  const accType = useAppSelector((state) => state.account.type);

  const onChange = (e: RadioChangeEvent) => {
    dispatch(toggleType(e.target.value));
  };
  return (
    <Space direction='horizontal' size={'small'}>
      <Typography.Text>{text} As:</Typography.Text>
      <Radio.Group
        defaultValue={accType}
        buttonStyle='solid'
        onChange={onChange}
      >
        <Radio value='patient'>Patient</Radio>
        <Radio value='dentist'>Dentist</Radio>
      </Radio.Group>
    </Space>
  );
};

export default AccountRadio;
