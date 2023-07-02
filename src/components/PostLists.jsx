import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import List from './List';

function PostLists() {
  const grams = useSelector((state) => state.grams);
  return (
    <ListsWrapper>
      {grams.map((gram) => {
        return <List key={gram.id} gram={gram} />;
      })}
    </ListsWrapper>
  );
}

export default PostLists;

const ListsWrapper = styled.div`
  margin-top: 8rem;
`;
