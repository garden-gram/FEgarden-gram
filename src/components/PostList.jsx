import React from 'react';
import { useSelector } from 'react-redux';
import MainPost from './MainPost';

function PostList() {
  const grams = useSelector((state) => state.grams);
  return (
    <>
      {grams.map((gram) => {
        return <MainPost key={gram.id} gram={gram} />;
      })}
    </>
  );
}

export default PostList;
