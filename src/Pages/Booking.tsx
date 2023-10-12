import React from 'react';
import { Col, Row, Space, Typography } from 'antd';
import { useAppSelector } from '../Redux/hooks';
import PatientCard from '../Components/BookingParts/PatientCard';
import DentistCard from '../Components/BookingParts/DentistCard';

const Booking: React.FC = () => {
  const account = useAppSelector((state) => state.account);
  const type = account.type;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Space direction='vertical' size={'large'} style={{ width: '100%' }}>
        <Typography.Title>Your Bookings</Typography.Title>
        {type === 'patient' ? <DentistCard /> : <PatientCard />}
      </Space>
    </div>
  );
};

export default Booking;
