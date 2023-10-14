import React from 'react';
import { useAppSelector } from '../Redux/hooks';
import Patients from '../Components/ContactsParts/Patients';
import Dentists from '../Components/ContactsParts/Dentists';

const Contacts: React.FC = () => {
  const type = useAppSelector((state) => state.account.type);
  return type === 'dentist' ? <Patients /> : <Dentists />;
};

export default Contacts;
