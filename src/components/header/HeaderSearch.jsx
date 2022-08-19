import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../app/CurrentUser';

function HeaderSearch() {
  // dispatch(setState());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const dispath = useDispatch();

  const onLogOutClick = (e) => {
    e.persist();
    auth.signOut();
    setIsLoggedIn((prev) => !prev);
    // dispath(setCurrentUser({ email: '', uid: '' }));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <HeaderRightContainer>
      <StyledImg src={'img/IconSearch.svg'} alt={`search`} />

      {isLoggedIn ? (
        <LoginButton to='/' onClick={onLogOutClick}>
          로그아웃
        </LoginButton>
      ) : (
        <LoginButton to='/login'>로그인</LoginButton>
      )}
    </HeaderRightContainer>
  );
}

const StyledImg = styled.img`
  display: inline-block;
  border-radius: 0;
`;

const HeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  width: 161px;

  img {
    width: 16px;
    margin-right: 25px;
  }
  img:hover {
    cursor: pointer;
  }
`;

const LoginButton = styled(Link)`
  width: 120px;
  height: 45px;

  background-color: rgb(47, 47, 47);
  border: none;
  border-radius: 10px;
  outline: none;

  color: rgb(255, 255, 255);
  font-weight: 600;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  line-height: 45px;
  text-decoration: none;
  text-align: center;

  cursor: pointer;
  &:hover,
  :active {
    color: black;
    background-color: #e6e6e6;
    transition: 0.7s;
    text-decoration: none;
  }
`;

export default HeaderSearch;
