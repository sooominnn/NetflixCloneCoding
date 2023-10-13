import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <ul>
        <li>화면 해설</li>
        <li>투자 정보(IR)</li>
        <li>법적 고지</li>
      </ul>
      <ul>
        <li>고객 센터</li>
        <li>입사 정보</li>
        <li>쿠키 설정</li>
      </ul>
      <ul>
        <li>기프트카드</li>
        <li>이용 약관</li>
        <li>회사 정보</li>
      </ul>
      <ul>
        <li>미디어 센터</li>
        <li>개인정보</li>
        <li>문의하기</li>
      </ul>
      <Button>서비스 코드</Button>
      <TextContainer>
        <div>
          넷플릭스서비시스코리아 유한회사 통신판매업신고번호:
          제2018-서울종로-0426호 전화번호: 080-001-9587
        </div>
        <div>대표: 레지널드 숀 톰프슨</div>
        <div>이메일 주소: korea@netflix.com</div>
        <div>
          주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층
          우편번호 03161
        </div>
        <div>사업자등록번호: 165-87-00119</div>
        <div>클라우드 호스팅: Amazon Web Services Inc.</div>
        <div>공정거래위원회 웹사이트</div>
      </TextContainer>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  height: 300px;
  z-index: 999; // 다른 요소보다 위에 레이어로 표시
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
