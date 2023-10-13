import React, { useState, useEffect } from 'react';
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import styled from 'styled-components';
import { ButtonCore } from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const MainHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onValid = (data) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  // const toggleSearch = () => setSearchOpen((prev) => !prev);

  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }

    setSearchOpen((prev) => !prev);
  };

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y > 80) {
      navAnimation.start('scroll');
    } else {
      navAnimation.start('top');
    }
  });

  // const scroll = scrollY.on('change', handleScroll);

  return (
    <Nav variants={navVariants} initial='top' animate={navAnimation}>
      <LogoTextContainer>
        <LogoContainer>
          <Link to='/browse'>
            <img src='../src/images/netflixlogo.svg' alt='Netflix Logo' />
          </Link>
        </LogoContainer>
        <Link to='/browse'>
          <ButtonCore theme='header'>홈</ButtonCore>
        </Link>
        <Link to='/browse/genre'>
          <ButtonCore theme='header'>시리즈</ButtonCore>
        </Link>
        <Link to='/browse/movie'>
          <ButtonCore theme='header'>영화</ButtonCore>
        </Link>
        <Link to='/latest'>
          <ButtonCore theme='header'>NEW! 요즘 대세 콘텐츠</ButtonCore>
        </Link>
        <Link to='/browse/my-list'>
          <ButtonCore theme='header'>내가 찜한 콘텐츠</ButtonCore>
        </Link>
        <Link to='/browse/original-audio'>
          <ButtonCore theme='header'>언어별로 찾아보기</ButtonCore>
        </Link>
      </LogoTextContainer>
      <IconContainer>
        <Col>
          <Search onSubmit={handleSubmit(onValid)}>
            <motion.svg
              onClick={toggleSearch}
              animate={{ x: searchOpen ? -177 : 0 }}
              transition={{ type: 'linear' }}
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </motion.svg>
            <Input
              {...register('keyword', { required: true, minLength: 2 })}
              animate={inputAnimation}
              initial={{ scaleX: 0 }}
              transition={{ type: 'linear' }}
              placeholder='Search for movie or tv show...'
            ></Input>
          </Search>
        </Col>
        <ButtonCore theme='header'>
          <img src='../src/images/bell.svg' alt='Bell Icon' />
        </ButtonCore>
        <ButtonCore theme='header'>
          <img
            src='https://occ-0-988-325.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbmFt7wJWIhoEAxZ6JCNpVotrJuE8dAC-BCcGKuA0-emyRWmR4EAHGfcHcpRzczkeAXVs-zBtIX3CeFHB9SCjK2QaY0Sjf0.png?r=9ef%22'
            alt='User Icon'
          />
        </ButtonCore>
      </IconContainer>
    </Nav>
  );
};

export default MainHeader;

const Nav = styled(motion.nav)`
  position: fixed;
  z-index: 99;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 20px 60px;
  color: white;
  font-size: 14px;
`;

const navVariants = {
  top: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  scroll: { backgroundColor: 'rgba(0, 0, 0, 1)' },
};

const LogoContainer = styled.button`
  background-color: transparent;
  border: none;
  width: 100px;
  height: 40px;
  cursor: pointer;
`;

const LogoTextContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 5px;
  gap: 10px;
  position: absolute;
  left: 80px;
`;

const IconContainer = styled.div`
  display: flex;
  /* padding: 20px 5px; */
  /* gap: 5px; */
  align-items: center;
  position: absolute;
  right: 150px;
`;

// const Input = styled.input`
//   background-color: transparent;
//   color: white;
//   border: none;
//   width: 190px;
//   height: 30px;

//   &::placeholder {
//     color: white;
//     font-size: 14px;
//     padding: 10px 5px;
//   }
// `;

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  position: absolute;
  z-index: -1;
  right: 0px;
  width: 210px;
  padding: 5px 10px 5px 40px;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  font-size: 12px;
  transform-origin: right center;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;
