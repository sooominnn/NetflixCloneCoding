import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

import styled from 'styled-components';
import { ButtonCore } from '../components/Button';
import {
  BsFillPlayCircleFill,
  BsHandThumbsUpFill,
  BsPlusCircle,
  BsFillPlayFill,
} from 'react-icons/bs';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function NowNewContents() {
  const [movie, setMovie] = useState([]);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // tmdb 데이터 가져오기
  const getMainMovie = () => {
    fetch(
      'http://api.themoviedb.org/3/movie/popular?api_key=dceedc8f6b866424573e71f33be7a911'
    )
      .then((res) => res.json())
      .then((json) => {
        if (json && json.results) {
          setMovie(json.results);
        }
      });
  };

  // console.log(movie);

  // index 증가하면서 슬라이드 모션 실행
  const increaseIndex = () => {
    if (movie && movie.length > 0) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = movie.length - 1;
      const offset = 6;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  useEffect(() => {
    getMainMovie();
  }, []);

  const navigate = useNavigate();
  const onBoxClicked = (movieId) => {
    navigate(`/browse/${movieId}`);
  };

  // 큰 Box 바깥 영역 선택시 큰 Box가 사라지도록
  const onOverlayClick = () => {
    navigate('/browse');
  };
  const bigMovieMatch = useMatch('/browse/:movieId');
  // console.log(bigMovieMatch);

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    movie.find((movieItem) => movieItem.id === +bigMovieMatch.params.movieId);

  return (
    <Container>
      <Banner onClick={increaseIndex} bgphoto={movie[0]?.backdrop_path || ''}>
        {/* <Title>{movie[0]?.title}</Title>
        <Overview>{movie[0]?.overview}</Overview> */}
      </Banner>
      {/* <MainButtonContainer>
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
      </MainButtonContainer> */}
      <SliderContainer>
        <Slider>
          <MainTitleContainer>넷플릭스 인기 컨텐츠</MainTitleContainer>
          {/* <BiSolidLeftArrow
            onClick={increaseIndex}
            bgphoto={movie[0]?.backdrop_path || ''}
            size={40}
          /> */}
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              transition={{ type: 'tween', duration: 1 }}
              key={index}
            >
              {movie
                .slice(1)
                .slice(index * 6, index * 6 + 6)
                .map((movieItem) => (
                  <Box
                    layoutId={movieItem.id}
                    key={movieItem.id}
                    whileHover='hover'
                    initial='normal'
                    variants={boxVariants}
                    onClick={() => onBoxClicked(movieItem.id)}
                    transition={{ type: 'tween' }}
                    bgphoto={movieItem.backdrop_path || ''}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movieItem.title}</h4>
                      <IconContainer>
                        <BsFillPlayCircleFill size={20} />
                        <BsPlusCircle size={20} />
                        <BsHandThumbsUpFill size={20} />
                      </IconContainer>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  variants={overlayVariants}
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <BigCover>
                        <img
                          src={`https://www.themoviedb.org/t/p/w500/${clickedMovie.backdrop_path}`}
                          alt={clickedMovie.title}
                        />
                      </BigCover>
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <ButtonContainer>
                        <ButtonCore theme='mainPlay'>
                          <BsFillPlayFill size='30' />
                          재생
                        </ButtonCore>
                        <BsPlusCircle size={47} />
                        <BsHandThumbsUpFill size={47} />
                      </ButtonContainer>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
          {/* <BiSolidRightArrow
            onClick={increaseIndex}
            bgphoto={movie[0]?.backdrop_path || ''}
            size={40}
          /> */}
        </Slider>
        <Slider>
          <MainTitleContainer>새로 올라온 컨텐츠</MainTitleContainer>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              transition={{ type: 'tween', duration: 1 }}
              key={index}
            >
              {movie
                .slice(1)
                .slice(index * 6, index * 6 + 6)
                .map((movieItem) => (
                  <Box
                    layoutId={movieItem.id}
                    key={movieItem.id}
                    whileHover='hover'
                    initial='normal'
                    variants={boxVariants}
                    onClick={() => onBoxClicked(movieItem.id)}
                    transition={{ type: 'tween' }}
                    bgphoto={movieItem.backdrop_path || ''}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movieItem.title}</h4>
                      <IconContainer>
                        <BsFillPlayCircleFill size={20} />
                        <BsPlusCircle size={20} />
                        <BsHandThumbsUpFill size={20} />
                      </IconContainer>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  variants={overlayVariants}
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <BigCover>
                        <img
                          src={`https://www.themoviedb.org/t/p/w500/${clickedMovie.backdrop_path}`}
                          alt={clickedMovie.title}
                        />
                      </BigCover>
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <ButtonContainer>
                        <ButtonCore theme='mainPlay'>
                          <BsFillPlayFill size='30' />
                          재생
                        </ButtonCore>
                        <BsPlusCircle size={47} />
                        <BsHandThumbsUpFill size={47} />
                      </ButtonContainer>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </Slider>
        <Slider>
          <MainTitleContainer>지금 뜨는 컨텐츠</MainTitleContainer>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              transition={{ type: 'tween', duration: 1 }}
              key={index}
            >
              {movie
                .slice(1)
                .slice(index * 6, index * 6 + 6)
                .map((movieItem) => (
                  <Box
                    layoutId={movieItem.id}
                    key={movieItem.id}
                    whileHover='hover'
                    initial='normal'
                    variants={boxVariants}
                    onClick={() => onBoxClicked(movieItem.id)}
                    transition={{ type: 'tween' }}
                    bgphoto={movieItem.backdrop_path || ''}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movieItem.title}</h4>
                      <IconContainer>
                        <BsFillPlayCircleFill size={20} />
                        <BsPlusCircle size={20} />
                        <BsHandThumbsUpFill size={20} />
                      </IconContainer>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  variants={overlayVariants}
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <BigCover>
                        <img
                          src={`https://www.themoviedb.org/t/p/w500/${clickedMovie.backdrop_path}`}
                          alt={clickedMovie.title}
                        />
                      </BigCover>
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <ButtonContainer>
                        <ButtonCore theme='mainPlay'>
                          <BsFillPlayFill size='30' />
                          재생
                        </ButtonCore>
                        <BsPlusCircle size={47} />
                        <BsHandThumbsUpFill size={47} />
                      </ButtonContainer>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </Slider>
      </SliderContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 1800px;
`;

const Banner = styled.div`
  height: 1500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 200px 0px 0px 80px;
  background-image: linear-gradient(to bottom, transparent, black),
    ${(props) => {
      return `url(https://www.themoviedb.org/t/p/w440_and_h660_face/${props.bgphoto})`;
    }};
  background-size: cover;
  background-color: black;
`;

// 상단 영화 제목
const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 20px;
`;

// 상단 영화 줄거리
const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

//슬라이드
const Slider = styled.div`
  position: relative;
  top: -1000px;
`;

//슬라이드 내 Row
const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr); // 한 열에 6개씩
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  background-image: ${(props) => {
    return `url(https://www.themoviedb.org/t/p/w440_and_h660_face/${props.bgphoto})`;
  }};
  object-fit: cover;
  background-size: cover;
  background-position: center;
  height: 250px;
  width: 100%;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

// Box 내 Row - motion
const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

// Box - motion
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

// 슬라이드 내 정보
const Info = styled(motion.div)`
  padding: 10px;
  opacity: 0;
  background-color: black;
  position: absolute;
  width: 271.7px;
  height: 70px;
  bottom: 0;
  h4 {
    text-align: left;
    font-size: 12px;
    color: white;
  }
`;

// 슬라이드 내 정보 - motion
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 50%;
  height: 96vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: black;
  object-fit: cover;
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
  exit: { opacity: 0 },
};

const BigCover = styled.div`
  img {
    width: 100%; /* 원하는 너비 설정 */
    height: auto; /* 자동으로 높이 조절 */
    object-fit: cover;
  }
`;

const BigTitle = styled.h3`
  color: white;
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -50px;
  color: white;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 7px;
`;

const ButtonContainer = styled.div`
  size: 20;
  position: absolute;
  top: 550px;
  padding: 20px 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const MainButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  position: absolute;
  top: 600px;
  left: 75px;
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

const MainTitleContainer = styled.div`
  font-size: 30px;
  font-weight: 400;
  color: white;
  display: flex;
  margin-left: 75px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 300px;
`;
