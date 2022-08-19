import React from 'react';
import styled from 'styled-components';

const SytledSpan = styled.span`
  display: flex;
  align-items: center;
  width: 161px;

  img {
    width: 100%;
    border-radius: 0;
  }
  .menubar {
    /* width: 100%; */
    cursor: pointer;
  }
  .oxoLogo {
    margin-left: 20px;
    width: 123px;
    height: initial;
    max-width: 100%;
    object-fit: contain;
    cursor: pointer;
  }
`;

function HeaderLogo() {
  return (
    <SytledSpan>
      <img className='menubar' src={'img/menu.svg'} />
      <img
        className='oxoLogo'
        width={'123px'}
        src={'img/oxopolitics_letter_logo.png'}
      />
    </SytledSpan>
  );
}

export default HeaderLogo;
