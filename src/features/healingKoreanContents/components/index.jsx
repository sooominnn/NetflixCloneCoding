import React from 'react';
import styled from 'styled-components';
import Movie from '../../../components/Movie';

const HealingKoreanContents = () => {
  return (
    <Container>
      <TitleContainer>힐링되는 한국 TV 프로그램</TitleContainer>
      <Movie />
    </Container>
  );
};

export default HealingKoreanContents;

const Container = styled.div`
  /* display: flex; */
`;

const TitleContainer = styled.div`
  font-size: 25px;
`;
