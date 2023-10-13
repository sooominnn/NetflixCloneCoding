import React from 'react';
import styled from 'styled-components';
import { ButtonCore } from './Button';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const MainMovie = () => {
  return (
    <MainImgContainer>
      <TextContainer>
        <TitleImageContainer>
          <img src='https://occ-0-988-325.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABd1iH80a2aY5vNSEguX9w_kAu7AGahLupFTiYCBaycPNHQIFumRw-8F6Lzu_W2vv4x-ty9RZ8X_9L4ZUd1vLrN_BlDSHdJDgdQdIiK9S8N5HCRmJSUl0apu2XnXvppeQq8mzTrICGzWY-Kuo6q0T3FTf4KnDHrLnLuibca_Y7oInHBoKe726FQ.webp?r=a26' />
        </TitleImageContainer>
        <div>
          즉흥적인 해들리(헤일리 루 리처드슨)와 논리적인 올리버(벤 하디). 런던행
        </div>
        <div>
          야간 비행기에서 사랑에 빠진 두 사람을 둘러싸고 운명은 거대한 계획을
          준비
        </div>
        <div>중이다.</div>
      </TextContainer>
      <MainButtonContainer>
        <ButtonCore theme='mainPlay'>
          <BsFillPlayFill size='50' />
          재생
        </ButtonCore>
        <ButtonCore theme='mainDetail'>
          <AiOutlineInfoCircle size='40' />
          상세 정보
        </ButtonCore>
        <ReplayItemContainer>
          <ReplayButton>
            <ButtonCore theme='replay'>
              <img src='../src/images/replay.svg' />
            </ButtonCore>
          </ReplayButton>
          <AgeBox>
            <span>15+</span>
          </AgeBox>
        </ReplayItemContainer>
      </MainButtonContainer>
    </MainImgContainer>
  );
};

export default MainMovie;

const MainImgContainer = styled.div`
  display: flex;
  /* padding: 10px 10px; */
  /* margin-bottom: 100px; */
  height: 100vh;
  /* border: solid 1px red; */
`;

const MainButtonContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  gap: 12px;
  /* padding: 10px 10px; */
  position: absolute;
  top: 950px;
  left: 90px;
`;

const TextContainer = styled.div`
  font-size: 35px;
  position: absolute;
  top: 750px;
  left: 90px;
`;

const TitleImageContainer = styled.div`
  position: absolute;
  top: -300px;
`;

const ReplayButton = styled.div`
  position: relative;
  left: 1100px;
`;

const AgeBox = styled.div`
  width: 80px;
  height: 35px;
  background-color: rgba(128, 128, 128, 0.5);
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 3px 15px;
  position: absolute;
  left: 1500px;
`;

const ReplayItemContainer = styled.div`
  display: flex;
  align-items: center;
`;
