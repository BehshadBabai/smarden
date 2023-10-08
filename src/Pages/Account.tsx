import React from 'react';
import { useAppSelector } from '../Redux/hooks';
import AccountLoggedIn from '../Components/AccountParts/AccountLoggedIn';
import AccountLogin from '../Components/AccountParts/AccountLogin';
import { Row } from 'antd';

const Account: React.FC = () => {
  const loggedIn = useAppSelector((state) => state.account.loggedIn);
  return (
    <Row justify={'center'}>
      {loggedIn ? <AccountLoggedIn /> : <AccountLogin />}
    </Row>
  );
};

export default Account;
