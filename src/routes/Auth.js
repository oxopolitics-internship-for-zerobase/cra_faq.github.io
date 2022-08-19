import React from 'react';

import { authService } from '../components/firebase';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import AuthForm from '../components/header/login/AuthForm';
import styled from 'styled-components';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    // else if (name === 'github') {
    //   provider = new GithubAuthProvider();
    // }

    await signInWithPopup(authService, provider);
  };
  return (
    <LoginContainer>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name='google'>
          Continue with Google.
        </button>
        {/* <button onClick={onSocialClick} name='github'>
          Continue with Github.
        </button> */}
      </div>
    </LoginContainer>
  );
};

export default Auth;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  border: 2px solid #e6e6e6;
`;
