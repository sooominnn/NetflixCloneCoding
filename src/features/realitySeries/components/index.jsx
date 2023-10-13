import React from 'react';
import styled from 'styled-components';
import Movie from '../../../components/Movie';

const RealitySeries = () => {
  return (
    <div>
      <TitleContainer>일상탈출 리얼리티 시리즈</TitleContainer>
      <Movie />
    </div>
  );
};

export default RealitySeries;

const TitleContainer = styled.div`
  font-size: 25px;
`;
