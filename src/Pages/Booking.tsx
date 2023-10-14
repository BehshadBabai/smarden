import React from 'react';
import { Col, Row, Space, Typography } from 'antd';
import { useAppSelector } from '../Redux/hooks';
import PatientCard from '../Components/BookingParts/PatientCard';
import DentistCard from '../Components/BookingParts/DentistCard';

const Booking: React.FC = () => {
  const account = useAppSelector((state) => state.account);
  const type = account.type;

  return type === 'patient' ? <DentistCard /> : <PatientCard />;
};

export default Booking;
