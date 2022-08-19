import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();

  // console.log(currentUser.value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user.email);
      if (user) {
        console.log(user);
      } else {
        console.log('aa');
      }
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        //create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      // console.log(data);
    } catch (error) {
      // console.dir(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
          className='authInput'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          className='authInput'
        />
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'Log In'}
          className='authInput authSubmit'
        />
        {error && <span className='authError'>{error}</span>}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </button>
    </>
  );
}
