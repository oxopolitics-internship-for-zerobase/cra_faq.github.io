import React, { useState } from 'react';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore';
import { app, dbService } from '../firebase';

function WritingAdmin({ User }) {
  const [editBtn, setEditBtn] = useState(false);

  const toggleBtnHandler = () => {
    setEditBtn((prev) => !prev);
    // console.log(editBtn);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { target } = e;
    const titleText = target.querySelector('#titleBox').value;
    const categoryText = target.querySelector('#qnaCategory').value;
    const descriptionText = target.querySelector('#description').value;
    const timeSet = new Date();
    const data = {
      title: titleText,
      description: descriptionText,
      category: categoryText,
      viewCount: 0,
      createdAt: timeSet,
      updatedAt: timeSet,
    };
    const db = dbService(app);
    const docRef = await addDoc(collection(db, 'QnA'), data);
    toggleBtnHandler();
    // console.log(data);
  };

  const EditingBtn = ({ state, toggleBtnHandler }) => {
    return (
      <>
        {!state ? (
          <StyledEditing
            type='button'
            value='글쓰기'
            onClick={toggleBtnHandler}
          />
        ) : null}
      </>
    );
  };

  const EditingForm = () => {
    return (
      <StyledFormBox onSubmit={onSubmit}>
        <StyledLabel htmlFor='titleBox'>제목</StyledLabel>
        <TitleBox id='titleBox' type='text' />
        <StyledLabel htmlFor='qnaCategory'>카테고리</StyledLabel>
        <QnaCategoryBox id='qnaCategory'>
          <option value=''>--Please choose an option--</option>
          <option value='피드백'>피드백</option>
          <option value='매너지수'>매너지수</option>
          <option value='기타_서비스_기능'>기타 서비스 기능</option>
          <option value='프로필_설정'>프로필 설정</option>
          <option value='옥소코인'>옥소코인</option>
          <option value='알림설정'>알림 설정</option>
          <option value='폴디'>폴디</option>
          <option value='정치성향별_다섯_부족'>정치성향별 다섯 부족</option>
          <option value='그룹'>그룹</option>
        </QnaCategoryBox>
        <StyledLabel htmlFor='description'>본문</StyledLabel>
        <TextAreaBox id='description' maxLength={1500} />
        <input type='submit' value='작성하기' className='submit' />
      </StyledFormBox>
    );
  };

  if (User === 'SOT3U2CfXxXlIJxUYkh79gD7WYj1') {
    return (
      <EditingContainer editBtn={editBtn}>
        {editBtn ? (
          <EditingForm />
        ) : (
          <EditingBtn state={editBtn} toggleBtnHandler={toggleBtnHandler} />
        )}
      </EditingContainer>
    );
  } else {
    <></>;
  }
}

export default WritingAdmin;

const EditingContainer = styled.div`
  display: flex;
  width: ${(props) => (props.editBtn ? 100 : 10)}%;
  position: relative;
  top: ${(props) => (props.editBtn ? 0 : -30)}px;
  margin-left: ${(props) => (props.editBtn ? 0 : 'auto')};
  .submit {
    width: 80px;
    height: 37px;
    margin: 0 7px 10px 640px;
    border-radius: 7px;
    background-color: black;
    color: white;
  }
`;

const StyledFormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  font-size: 16px;
`;

const TitleBox = styled.input`
  outline: none;
  border-radius: 5px;
  border: 2px solid #e6e6e6;
  height: 30px;

  font-weight: bold;

  &:focus {
    border-color: tomato;
  }
`;

const QnaCategoryBox = styled.select`
  outline: none;
  border-radius: 5px;
  border: 2px solid #e6e6e6;
  height: 30px;

  font-weight: bold;
  option {
    font-weight: bold;
  }
  &:focus {
    border-color: tomato;
  }
`;

const TextAreaBox = styled.textarea`
  resize: none;
  height: 200px;

  outline: none;
  border: 2px solid #e6e6e6;
  border-radius: 12px;

  margin-bottom: 15px;
  padding: 8px;

  font-weight: bold;

  &:focus {
    border-color: tomato;
  }
`;

const StyledEditing = styled.input`
  width: 100px;
  height: 35px;

  background-color: white;
  border: 2px solid #e6e6e6;
  border-radius: 10px;
  outline: none;
  font-weight: bold;
  transition: 0.5s ease-in-out;

  cursor: pointer;
  &:hover {
    background-color: #464646;
    color: #fff;
  }
`;

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  margin: 5px 0;
`;
