import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../app/CurrentUser';
import styled from 'styled-components';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  // const currentUser = useSelector((state) => state.currentUser.currentUser);
  const dispatch = useDispatch();

  // console.log(currentUser.value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user.email);
      if (user) {
        dispatch(
          setCurrentUser({ email: `${user.email}`, uid: `${user.uid}` })
        );
        if (window.location.href !== 'http://localhost:5173/') {
          window.location.href = '/';
        }
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
      <StyledForm onSubmit={onSubmit}>
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
      </StyledForm>
      <LoginBox onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </LoginBox>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  margin: 10px 0;
  input {
    width: 200px;
    height: 25px;
    margin: 10px 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const LoginBox = styled.div`
  margin-bottom: 10px;
  padding: 5px;
  border: 3px solid #e6e6e6;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #464646;
    color: #e6e6e6;
  }
`;
