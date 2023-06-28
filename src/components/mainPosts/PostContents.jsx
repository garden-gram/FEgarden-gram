import React from 'react';
import styled from 'styled-components';

function PostContents({ gram }) {
  return (
    <>
      <StContents>{gram.contents}</StContents>
    </>
  );
}

export default PostContents;

const StContents = styled.div`
  padding: 1rem;
  height: 3rem;
  overflow: hidden;
  word-break: break-all;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-overflow: ellipsis;
  // border-radius: 0 0 10px 10px;

  background-color: #fff;
  border-radius: 0 0 10px 10px;
`;
