import React from 'react';
import styled from 'styled-components';
import Movie from '../../../components/Movie';

const PopularContents = () => {
  return (
    <div>
      <PopularContainer>
        <TitleContainer>넷플릭스 인기 콘텐츠</TitleContainer>
        <Movie />
      </PopularContainer>
    </div>
  );
};

export default PopularContents;

const TitleContainer = styled.div`
  font-size: 25px;
`;

const PopularContainer = styled.div`
  border: 1px solid white;
`;
