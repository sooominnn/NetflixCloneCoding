import React from 'react';
import styled from 'styled-components';
import Movie from '../../../components/Movie';

const NewContents = () => {
  return (
    <div>
      <TitleContainer>새로 올라온 콘텐츠</TitleContainer>
      <Movie />
    </div>
  );
};

export default NewContents;

const TitleContainer = styled.div`
  font-size: 25px;
`;
