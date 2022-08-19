import { onAuthStateChanged } from 'firebase/auth';
import { auth, CreateUser, SignUser } from '../../firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../app/CurrentUser';
import styled from 'styled-components';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setCurrentUser({ email: `${user.email}`, uid: `${user.uid}` })
        );
        if (
          window.location.href !==
          'https://oxopolitics-internship-for-zerobase.github.io/cra_faq.github.io/'
        ) {
          window.location.href = '/cra_faq.github.io/';
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
        data = CreateUser(email, password);
        console.log(data);
      } else {
        //log in
        data = await SignUser(email, password);
        console.log(data);
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
