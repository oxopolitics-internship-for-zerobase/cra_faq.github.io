import React, { useEffect } from 'react';
import styled from 'styled-components';
import IconHome from './icons/IconHome';
import IconPoldi from './icons/IconPoldi';
import IconChat from './icons/IconChat';

function HeaderNav({ active, Change }) {
  const navHandler = (e) => {
    const el = e.target.closest('li');
    if (!el) return;
    const currentSvg = el.querySelector('path');
    const navText = el.classList.contains('active');
    // console.log(active);
    Change('test');
    if (!navText) {
      console.log(`${el.classList.item(0)}`);
      // const $headerNav = document.querySelector('.headerNav');
      const prevActive = document.querySelector('.active');
      if (prevActive) {
        prevActive.classList.remove('active');
        const prevSvg = prevActive.querySelector('path');
        prevSvg.setAttribute('fill', '#e6e6e6');
      }
      el.classList.add('active');
      currentSvg.setAttribute('fill', '#ffffff');
    }
  };

  useEffect(() => {
    if (!active) {
      return;
    }
    const activeList = document.querySelector(`.${active}`);
    const activeSvg = activeList.querySelector('path');
    activeList.classList.add('active');
    activeSvg.setAttribute('fill', '#ffffff');
  }, []);

  return (
    <Nav>
      <ul onClick={navHandler}>
        <li className='IconHome'>
          <IconHome color={'#e6e6e6'} />
          <span>홈</span>
        </li>
        <li className='IconPoldi'>
          <IconPoldi color={'#e6e6e6'} /> <span>폴디</span>
        </li>
        <li className='IconChat'>
          <IconChat color={'#e6e6e6'} /> <span>톡</span>
        </li>
      </ul>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  width: 320px;
  justify-content: space-around;
  align-items: center;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
  }
  li {
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    width: 58px;
    height: 40px;
    list-style: none;
    font-weight: 600;
    font-size: 14px;
    transition: 0.4s;
    cursor: pointer;
    svg {
      border-radius: 0;
      margin-right: 10px;
    }
    span {
      display: none;
    }
    &:hover {
      width: 90px;
      /* height: 40px; */
      background-color: rgb(245, 245, 245);
      transition: all 0.4s ease 0s;
    }
    &:hover span {
      display: inline-block;
      color: #2f2f2f;
    }
  }
  .active {
    width: 90px;
    height: 40px;
    background-color: #2f2f2f;
    transition: 0.4s;
  }
  .active span {
    display: inline-block;
    color: #ffffff;
  }
`;

export default HeaderNav;
