import React from 'react';
import FaqBody from '../components/FaqBody/FaqBody';
import Header from '../components/header/Header';
import AdminInfo from '../components/header/login/AdminInfo';
import { useSelector } from 'react-redux';

function Home() {
  AdminInfo();
  const currentUser = useSelector(
    (state) => state.currentUser.currentUser.value.uid
  );
  console.log(currentUser);
  return (
    <div>
      <Header />
      <FaqBody currentUser={currentUser} />
    </div>
  );
}

export default Home;
