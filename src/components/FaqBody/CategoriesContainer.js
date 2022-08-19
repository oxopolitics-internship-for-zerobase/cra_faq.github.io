import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Category from './Category';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { dbService } from '../firebase';

const CategoriesContainer = ({ cate, setCate }) => {
  const [categoriesArr, setCategoriesArr] = useState([]);
  const usersCollectionRef = collection(dbService, 'QnA');

  const getAnswers = async () => {
    const q = query(usersCollectionRef);
    onSnapshot(q, (snapshot) => {
      let arr = ['FAQ'];
      const dataArray = snapshot.docs.map((doc) => {
        let category = doc.data().category;
        if (!arr.includes(category)) {
          arr.push(category);
        }
      });
      setCategoriesArr(arr);
    });
  };

  useEffect(() => {
    getAnswers();
  }, []);

  const handleClick = (e) => {
    if (e.target.tagName != 'BUTTON') return;
    setCate(e.target.value);
  };

  return (
    <StyledWrapper onClick={handleClick}>
      {categoriesArr.map((elem, idx) => (
        <Category elem={elem} cate={cate} key={idx} />
      ))}
    </StyledWrapper>
  );
};

export default CategoriesContainer;

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 709px;
  margin-top: 41px;
  margin-bottom: 4px;
`;
