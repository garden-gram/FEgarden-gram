import React from 'react';
import { useSelector } from 'react-redux';
import List from './List';

function PostLists() {
  const grams = useSelector((state) => state.grams);
  return (
    <>
      {grams.map((gram) => {
        return <List key={gram.id} gram={gram} />;
      })}
    </>
  );
}

export default PostLists;
