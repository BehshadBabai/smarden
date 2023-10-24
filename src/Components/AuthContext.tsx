import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Firebase/context';
import { auth } from '../Firebase/firebase';
import { User } from 'firebase/auth';
import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { toggleLoggedIn } from '../Redux/features/account/account-slice';
import { useAppSelector } from '../Redux/hooks';
import { fetchSingleDocument, syncBooking, syncUser } from '../Utilities/Util';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const dispatch = useDispatch();
  const loggedIn = useAppSelector((state) => state.account.loggedIn);
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        const snapShot = await fetchSingleDocument('users', uid);
        if (snapShot.exists()) {
          const data = snapShot.data();
          syncUser(data, dispatch, {
            id: firebaseUser.uid,
            email: firebaseUser.email
          });
          syncBooking(dispatch);
        }
        if (!loggedIn) {
          dispatch(toggleLoggedIn());
        }
      } else {
        if (loggedIn) {
          dispatch(toggleLoggedIn());
        }
      }
      setPending(false);
    });
  }, []);

  if (pending) return <Loading />;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
