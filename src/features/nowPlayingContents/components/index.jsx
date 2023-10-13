import React from 'react';
import styled from 'styled-components';
import Movie from '../../../components/Movie';

const NowPlayingContents = () => {
  return (
    <div>
      <NowPlayingContainer>
        <TitleContainer>지금 뜨는 콘텐츠(현재 상영중으로)</TitleContainer>
        <Movie />
      </NowPlayingContainer>
    </div>
  );
};

export default NowPlayingContents;

const TitleContainer = styled.div`
  font-size: 25px;
`;

const NowPlayingContainer = styled.div`
  border: 1px solid yellow;
`;
