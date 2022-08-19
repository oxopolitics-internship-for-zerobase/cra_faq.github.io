import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Answer from './Answer';
import {
  query,
  collection,
  onSnapshot,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { dbService } from '../firebase';

const AnswersContainer = ({ cate, search }) => {
  const [answers, setAnswers] = useState([]);
  const usersCollectionRef = collection(dbService, 'QnA');

  const getAnswers = async () => {
    let q = '';
    if (cate === 'FAQ') {
      q = query(usersCollectionRef, orderBy('viewCount', 'desc'), limit(4));
    } else {
      q = query(usersCollectionRef, where('category', '==', cate));
    }
    onSnapshot(q, (snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnswers(dataArray);
    });
  };

  useEffect(() => {
    getAnswers();
  }, [cate]);

  return (
    <StyledWrapper>
      {!!answers &&
        answers
          .filter(
            (ans) =>
              ans.title.includes(search) || ans.description.includes(search)
          )
          .map((elem) => (
            <Answer
              ansArr={elem}
              key={elem.id}
              answerId={elem.id}
              cate={cate}
              search={search}
            />
          ))}
    </StyledWrapper>
  );
};

export default AnswersContainer;

const StyledWrapper = styled.div`
  h3 {
    width: 709px;
    font-size: 20px;
    font-weight: 700;
  }
`;
