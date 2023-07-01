import React, { useState } from 'react';
import styled from 'styled-components';

import onLike from '../../assets/icon/like.svg';
import offLike from '../../assets/icon/unLike.svg';

function ListLike({ gram }) {
  const [count, setCount] = useState(gram.like_count);
  const [status, setStatus] = useState(false);

  const likeHandler = (isLike) => {
    if (isLike) {
      setCount(Number(count) - 1);
      setStatus(false);
    } else {
      setCount(Number(count) + 1);
      setStatus(true);
    }
  };

  return (
    <IconContainer>
      <Icon onClick={() => likeHandler(status)} src={status ? onLike : offLike} />
      <Cnt> {count}</Cnt>
    </IconContainer>
  );
}

export default ListLike;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  height: 1.2rem;

  background-color: #fff;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.2rem;
  cursor: pointer;
  display: block;
`;

const Cnt = styled.p`
  width: 1.5rem;
  height: 1rem;
  font-size: 1rem;
  margin-top: 0.4rem;
`;
