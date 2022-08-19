import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { dbService } from '../firebase';
import { useSelector } from 'react-redux';

const Answer = ({
  ansArr: { title, description, viewCount },
  answerId,
  cate,
  search,
}) => {
  const [active, setActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [answerViewCount, setAnswerViewCount] = useState(viewCount);
  const currentUser = useSelector(
    (state) => state.currentUser.currentUser.value.uid
  );
  const QnATextRef = doc(dbService, 'QnA', answerId);

  useEffect(() => {
    if (search && (title.includes(search) || description.includes(search))) {
      setActive(true);
    }
  }, []);

  const increaseViewCount = async () => {
    await updateDoc(QnATextRef, {
      viewCount: answerViewCount,
    });
  };

  const handleUpdate = (e) => {
    let ok = true;
    if (isEdit) {
      ok = window.confirm('수정을 취소하시겠습니까?');
      if (!ok) return;
    } else {
      setEditText(description);
      setEditTitle(title);
    }
    setIsEdit(!isEdit);
    e.stopPropagation();
  };
  const handleDelete = async (e) => {
    const ok = window.confirm('글을 삭제하시겠습니까?');
    if (ok) {
      await deleteDoc(QnATextRef);
    }
    e.stopPropagation();
  };

  const getEditForm = () => {
    return (
      <EditForm onSubmit={handleEditSubmit}>
        <div className='editFormHeader'>
          <input
            id='title'
            type='text'
            placeholder='제목'
            value={editTitle}
            onChange={(e) => setEditTitle(e)}
            required
          />
          <select id='category'>
            <option value=''>--Please choose an option--</option>
            <option value='피드백'>피드백</option>
            <option value='매너지수'>매너지수</option>
            <option value='기타 서비스 기능'>기타 서비스 기능</option>
            <option value='프로필 설정'>프로필 설정</option>
            <option value='옥소코인'>옥소코인</option>
            <option value='알림설정'>알림 설정</option>
            <option value='폴디'>폴디</option>
            <option value='정치성향별 다섯 부족'>정치성향별 다섯 부족</option>
            <option value='그룹'>그룹</option>
          </select>
        </div>
        <textarea
          id='description'
          type='text'
          placeholder='내용'
          value={editText}
          onChange={(e) => {
            setEditText(e.value);
          }}
          required
        />
        <input className='editSubmit' type='submit' value='수정' />
      </EditForm>
    );
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { target } = e;
    const titleText = target.querySelector('#title').value;
    const categoryText = target.querySelector('#category').value
      ? target.querySelector('#category').value
      : cate;
    //! category가 blank일 때 기본 카테고리로

    const descriptionText = target.querySelector('#description').value;
    const timeSet = new Date();

    const data = {
      title: titleText,
      description: descriptionText,
      category: categoryText,
      updatedAt: timeSet,
    };

    const ok = window.confirm('글을 수정하시겠습니까?');
    if (ok) {
      await updateDoc(QnATextRef, data);
    }

    setIsEdit(false);
  };

  const answerCardClick = () => {
    setActive((prev) => !prev);

    if (!active) {
      setAnswerViewCount((prev) => prev + 1);
      increaseViewCount();
    }
  };

  return (
    <StyledWrapper className={`answerContainer${active ? ' active' : ''}`}>
      <span onClick={answerCardClick}>
        <h4>{search ? highlightText(title, search) : title}</h4>
        {validAdmin(currentUser) ? (
          <div className='adminButtons'>
            <button onClick={handleUpdate} type='button'>
              {isEdit ? '취소' : '수정'}
            </button>
            <button onClick={handleDelete} type='button'>
              삭제
            </button>
          </div>
        ) : null}
        <img src='img/arrow.svg' alt={active ? '닫힌 질문' : '열린 질문'} />
      </span>
      {isEdit && <>{getEditForm()}</>}
      {active && !isEdit ? <>{makeText(description, search)}</> : null}
    </StyledWrapper>
  );
};

const highlightText = (text, search) => {
  const split = text.split(search);

  return (
    <>
      {split.map((s, idx) => {
        return (
          <span key={idx}>
            {idx != 0 && <b>{search}</b>}
            {s}
          </span>
        );
      })}
    </>
  );
};

const makeText = (answer, search) => {
  let answerSplit = answer.split('\\n');
  let text = [];
  for (let e of answerSplit) {
    if (e) {
      text.push(e);
    }
  }

  return (
    <p>
      {text.map((el, idx) => {
        if (search && el.includes(search)) {
          return <span key={idx}>{highlightText(el, search)}</span>;
        }
        return <span key={idx}>{el}</span>;
      })}
    </p>
  );
};

const validAdmin = (id) => {
  const ADMIN_UID = 'SOT3U2CfXxXlIJxUYkh79gD7WYj1';
  console.log(id);
  if (id === ADMIN_UID) {
    return true;
  } else {
    return false;
  }
};

export default Answer;

const StyledWrapper = styled.div`
  position: relative;
  width: 709px;
  box-sizing: border-box;
  margin-bottom: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;

  span {
    display: flex;

    h4 {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      height: 46px;
      margin: 0;
      padding: 0px 16px;
      font-size: 16px;
      font-weight: 500;
      cursor: default;

      b {
        margin: 0 2px;
        font-weight: 700;
        text-decoration: underline;
        color: coral;
      }
    }
    img {
      position: absolute;
      width: 20px;
      right: 18px;
      top: 17px;
    }
    .adminButtons {
      position: absolute;
      right: 60px;
      top: 4px;
      button {
        width: 60px;
        height: 30px;
        margin: 4px;
        background-color: white;
        color: black;
        border: 1px solid black;
        border-radius: 5px;
      }
    }
  }

  &.active span {
    h4 {
      height: 47px;
      padding-top: 1px;
      border: 1px solid #e6e6e6;
      border-width: 0 0 1px 0;
      font-weight: 700;
    }
    img {
      rotate: 180deg;
      top: 16px;
    }
  }

  p {
    padding: 0px 30px 0 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 180%;
    b {
      font-weight: 700;
      text-decoration: underline;
      color: coral;
    }
  }

  span {
    display: block;
  }
`;

const EditForm = styled.form`
  font-size: 14px;
  font-weight: 500;
  .editFormHeader {
    display: flex;
    width: 100%;
    height: 50px;
    font-weight: 600;
    #title {
      flex: 3;
      box-sizing: border-box;
      height: 30px;
      padding-left: 10px;
      margin: 7px 5px 10px 7px;
      border: 1px solid #e6e6e6;
    }
    #category {
      flex: 1;
      box-sizing: border-box;
      height: 30px;
      padding-left: 10px;
      margin: 7px 5px 10px 7px;
      border: 1px solid #e6e6e6;
    }
  }

  #description {
    box-sizing: border-box;
    margin: 0px 7px 7px 7px;
    padding-left: 10px;
    width: 693px;
    height: 200px;
    border: 1px solid #e6e6e6;
    line-height: 1.6;
  }

  .editSubmit {
    width: 60px;
    height: 30px;
    margin: 0 7px 10px 640px;
    border-radius: 5px;
    background-color: black;
    color: white;
  }
`;
