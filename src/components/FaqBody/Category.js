import React from 'react';
import styled from 'styled-components';

const Category = ({ cate, elem }) => {
  return (
    <CategoryButton
      //! mockup idx 0일 때만 active 추가
      className={elem === cate ? ' active' : ''}
      value={elem}
      type='button'>
      {elem}
    </CategoryButton>
  );
};

export default Category;

const CategoryButton = styled.button`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: 42px;
  margin-right: 14px;
  margin-bottom: 10px;
  padding: 10px 16px;
  font-family: SUIT;
  font-size: 16px;
  font-weight: 600;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  transition: color 0.2s, background-color 0.2s, border 0.2s;

  &.active {
    background: #000000;
    border: 1px solid #000000;
    color: white;
  }
`;
