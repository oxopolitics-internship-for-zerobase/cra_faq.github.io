import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { setCurrentUser } from '../../../app/CurrentUser';
import { useEffect } from 'react';

export const ADMIN_UID = 'SOT3U2CfXxXlIJxUYkh79gD7WYj1';

export default function AdminInfo() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        dispatch(
          setCurrentUser({ email: `${user.email}`, uid: `${user.uid}` })
        );
      }
    });
  }, []);
}
