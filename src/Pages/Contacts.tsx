import React from 'react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import Patients from '../Components/ContactsParts/Patients';
import Dentists from '../Components/ContactsParts/Dentists';
import { changeRoute } from '../Redux/features/app/app-slice';
import { useNavigate } from 'react-router-dom';

const Contacts: React.FC = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const type = account.type;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!account.loggedIn) {
      navigate('/');
      dispatch(changeRoute('/'));
    }
  }, []);
  return account.loggedIn ? (
    type === 'dentist' ? (
      <Patients />
    ) : (
      <Dentists />
    )
  ) : (
    <></>
  );
};

export default Contacts;
