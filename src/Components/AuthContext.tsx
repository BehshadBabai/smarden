import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Firebase/context';
import { auth, firestore } from '../Firebase/firebase';
import { User } from 'firebase/auth';
import Loading from '../Loading';
import { useDispatch } from 'react-redux';
import { toggleLoggedIn } from '../Redux/features/account/account-slice';
import { useAppSelector } from '../Redux/hooks';
import { doc, getDoc } from 'firebase/firestore';
import { syncRedux } from '../Utilities/Util';

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
        const docRef = doc(firestore, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          syncRedux(data, dispatch);
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
