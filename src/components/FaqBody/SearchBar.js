import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBar = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = (e) => {
    e.preventDefault();
    console.log('clear');
    setSearch('');
  };
  return (
    <StyledWrapper search={search}>
      <form>
        <input placeholder='검색' onChange={handleChange} value={search} />
        <button
          className='clearButton'
          type={'button'}
          onClick={handleClear}
          disabled={!search}>
          초기화
        </button>
      </form>
    </StyledWrapper>
  );
};

export default SearchBar;

const StyledWrapper = styled.div`
  margin-bottom: 70px;

  form {
    position: relative;
    width: 709px;

    input {
      box-sizing: border-box;
      width: 709px;
      height: 42px;
      padding: 0 12px;
      border-radius: 10px;
      border: 1px solid #929292;
      font-size: 16px;
      font-weight: 300;
    }
    .clearButton {
      position: absolute;
      width: 90px;
      height: 100%;
      padding: 0;
      right: 0px;
      font-size: 16px;
      font-weight: 500;
      color: white;
      border: none;
      border-radius: 0 10px 10px 0;
      cursor: pointer;
      background-color: black;
      z-index: 1;
    }
    .clearButton:disabled {
      background-color: #929292;
      cursor: default;
    }
  }
`;
