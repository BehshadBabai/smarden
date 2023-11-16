import React from 'react';
import { useAppSelector } from '../Redux/hooks';
import AccountLoggedIn from '../Components/AccountParts/AccountLoggedIn';
import AccountLogin from '../Components/AccountParts/AccountLogin';
import { Row } from 'antd';
import BetaLogin from '../Components/AccountParts/BetaLogin';

const Account: React.FC = () => {
  const loggedIn = useAppSelector((state) => state.account.loggedIn);
  return (
    <Row justify={'center'}>
      {/* comment out for release after beta mode  */}
      {/* {loggedIn ? <AccountLoggedIn /> : <AccountLogin />} */}

      {/* remove after beta is over  */}
      {loggedIn ? <AccountLoggedIn /> : <BetaLogin />}
    </Row>
  );
};

export default Account;
