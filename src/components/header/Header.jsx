import React, { useState } from 'react';
import styled from 'styled-components';

import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';

function Header(props) {
  const [active, setActive] = useState('IconHome');
  return (
    <>
      <Stylehaed className={props.className}>
        <HeaderLogo />
        <HeaderNav active={active} Change={setActive} />
        <HeaderSearch />
      </Stylehaed>
    </>
  );
}

const Stylehaed = styled.header`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  border-radius: 0;
  box-sizing: border-box;
  padding: 0 50px;
  border-bottom: 1px solid #e6e6e6;
`;

export default Header;
