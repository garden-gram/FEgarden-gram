import React from 'react';
import { useSelector } from 'react-redux';
import MainPost from './MainPost';

function PostList() {
  const grams = useSelector((state) => state.grams);
  console.log(grams[0]);
  return (
    <>
      {grams.map((gram) => {
        return <MainPost key={gram.id} gram={gram} />;
      })}
    </>
  );
}

export default PostList;
