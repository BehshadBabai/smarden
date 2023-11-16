import React from 'react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import PatientCard from '../Components/BookingParts/PatientCard';
import DentistCard from '../Components/BookingParts/DentistCard';
import { useNavigate } from 'react-router-dom';
import { changeRoute } from '../Redux/features/app/app-slice';
import { auth } from '../Firebase/firebase';

const Booking: React.FC = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const type = account.type;
  const navigate = useNavigate();

  React.useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(changeRoute('/'));
        navigate('/');
      }
    });
  }, []);

  return account.loggedIn ? (
    type === 'patient' ? (
      <DentistCard />
    ) : (
      <PatientCard />
    )
  ) : (
    <></>
  );
};

export default Booking;
