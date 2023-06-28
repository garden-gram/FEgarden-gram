import React from 'react';
import styled from 'styled-components';
import dot_img from '../../assets/icon/dote_edit_delete.svg';
function PostInfo({ gram }) {
  const { name, users_img, time } = gram;
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  const nowDate = detailDate(time);

  return (
    <StInfoWrapper>
      <StProfile>
        <StUserImg src={users_img} />
        <StUserName>{name}</StUserName>
      </StProfile>

      <StInfo>
        <StTime>{nowDate}</StTime>
        <img src={dot_img} alt="dot" />
      </StInfo>
    </StInfoWrapper>
  );
}

export default PostInfo;

const StInfoWrapper = styled.div`
  width: 28rem;
  height: 4.5rem;
  background-color: #ffff;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StProfile = styled.div`
  width: 11rem;
  height: 4.5rem;

  display: flex;
  align-items: center;
`;

const StUserImg = styled.img`
  width: 4.2rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: #ffff;
`;

const StUserName = styled.div`
  font-size: 1.3rem;
  margin-left: 1.25rem;
`;

const StInfo = styled.div`
  width: 7.5rem;
  height: 2.4rem;

  margin-right: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StTime = styled.div`
  margin-right: 1rem;
`;
