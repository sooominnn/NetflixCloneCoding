import { motion, AnimatePresence } from 'framer-motion';
// AnimatePresence는 컴포넌트가 render 되거나 destroy 될 때 효과를 줄 수 있음
import { useState, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

import styled from 'styled-components';
import { ButtonCore } from '../../../components/Button';
import {
  BsFillPlayCircleFill,
  BsHandThumbsUpFill,
  BsPlusCircle,
  BsFillPlayFill,
} from 'react-icons/bs';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function Practice() {
  const [mainMovie, setMainMovie] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);

  // 슬라이드 동작시 생기는 여백 없애려고
  const [leaving, setLeaving] = useState(false);

  // tmdb 데이터 가져오기
  // 넷플릭스 인기 컨텐츠
  const getMainMovie = () => {
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=dceedc8f6b866424573e71f33be7a911'
    )
      .then((res) => res.json())
      .then((json) => {
        if (json && json.results) {
          setMainMovie(json.results);
        }
      });
  };

  // 새로 올라온 컨텐츠
  const getNewMovie = () => {
    fetch(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=dceedc8f6b866424573e71f33be7a911'
    )
      .then((res) => res.json())
      .then((json) => {
        if (json && json.results) {
          setNewMovies(json.results);
        }
      });
  };

  // 지금 뜨는 컨텐츠
  const getTrendingMovie = () => {
    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=dceedc8f6b866424573e71f33be7a911'
    )
      .then((res) => res.json())
      .then((json) => {
        if (json && json.results) {
          setTrendingMovies(json.results);
        }
      });
  };

  // console.log(movie);

  // index 증가하면서 슬라이드 모션 실행
  // 넷플릭스 인기 컨텐츠
  const increaseIndex1 = () => {
    if (mainMovie && mainMovie.length > 0) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = mainMovie.length - 1;
      const offset = 6;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex1((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  // 새로 올라온 컨텐츠
  const increaseIndex2 = () => {
    if (newMovies && newMovies.length > 0) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = newMovies.length - 1;
      const offset = 6;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex2((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  // 지금 뜨는 컨텐츠
  const increaseIndex3 = () => {
    if (trendingMovies && trendingMovies.length > 0) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = trendingMovies.length - 1;
      const offset = 6;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex3((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  // 넷플릭스 인기 컨텐츠
  useEffect(() => {
    getMainMovie();
  }, []);

  // 새로 올라온 컨텐츠
  useEffect(() => {
    getNewMovie();
  }, []);

  // 지금 뜨는 컨텐츠
  useEffect(() => {
    getTrendingMovie();
  }, []);

  // useNavigate 사용함으로써 여러 route를 왔다갔다 가능
  const navigate = useNavigate();
  // Box 선택시 어떤 영화인지 id 확인 후 url 변경
  const onBoxClicked = (movieId) => {
    navigate(`/browse/${movieId}`);
  };

  // 큰 Box 바깥 영역 선택시 큰 Box가 사라지도록
  const onOverlayClick = () => {
    navigate('/browse');
  };

  // 현재 위치 확인 -> bigMovieMatch가 존재한다는건 BigMovie를 보여줘야 한다는것
  const bigMovieMatch = useMatch('/browse/:movieId');
  // console.log(bigMovieMatch);

  // bigMovieMatch가 존재하는지 확인
  const clickedMainMovie =
    bigMovieMatch?.params.movieId &&
    mainMovie.find(
      (movieItem) => movieItem.id === +bigMovieMatch.params.movieId
    );

  const clickedNewMovie =
    bigMovieMatch?.params.movieId &&
    newMovies.find(
      (movieItem) => movieItem.id === +bigMovieMatch.params.movieId
    );

  const clickedTrendingMovie =
    bigMovieMatch?.params.movieId &&
    trendingMovies.find(
      (movieItem) => movieItem.id === +bigMovieMatch.params.movieId
    );

  return (
    <Container>
      <Banner bgphoto={mainMovie[0]?.backdrop_path || ''}>
        <Title>{mainMovie[0]?.title}</Title>
        <Overview>{mainMovie[0]?.overview}</Overview>
      </Banner>
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
      <SliderContainer>
        <Slider>
          <MainTitleContainer>넷플릭스 인기 컨텐츠</MainTitleContainer>
          {/* <BiSolidRightArrow size={50} onClick={increaseIndex1} /> */}
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              transition={{ type: 'tween', duration: 1 }}
              key={index1}
            >
              {mainMovie
                .slice(1)
                .slice(index1 * 6, index1 * 6 + 6)
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
                    style={{
                      backgroundSize: '70%',
                    }}
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
              <BiSolidLeftArrow
                size={50}
                onClick={increaseIndex3}
                style={{
                  position: 'absolute',
                  left: '10px', // 오른쪽으로 10px 이동
                  top: '50%', // 수직 가운데 정렬
                  transform: 'translateY(-50%)', // 수직 가운데 정렬(top: '50%'만 하면 정확히 정렬되지 않을 수 있어서 사용)
                  cursor: 'pointer',
                }}
              />
              <BiSolidRightArrow
                size={50}
                onClick={increaseIndex1}
                style={{
                  position: 'absolute',
                  right: '10px', // 오른쪽으로 10px 이동
                  top: '50%', // 수직 가운데 정렬
                  transform: 'translateY(-50%)', // 수직 가운데 정렬(top: '50%'만 하면 정확히 정렬되지 않을 수 있어서 사용)
                  cursor: 'pointer',
                }}
              />
            </Row>
          </AnimatePresence>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.movieId}>
                  {clickedMainMovie && (
                    <>
                      <BigCover>
                        <img
                          src={`https://www.themoviedb.org/t/p/w500/${clickedMainMovie.backdrop_path}`}
                          alt={clickedMainMovie.title}
                        />
                      </BigCover>
                      <BigTitle>{clickedMainMovie.title}</BigTitle>
                      <ButtonContainer>
                        <ButtonCore theme='mainPlay'>
                          <BsFillPlayFill size='30' />
                          재생
                        </ButtonCore>
                        <BsPlusCircle size={47} />
                        <BsHandThumbsUpFill size={47} />
                      </ButtonContainer>
                      <BigOverview>{clickedMainMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </Slider>
        <Slider>
          <MainTitleContainer>새로 올라온 컨텐츠</MainTitleContainer>
          {/* <BiSolidRightArrow size={50} onClick={increaseIndex2} /> */}
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              transition={{ type: 'tween', duration: 1 }}
              key={index2}
            >
              {newMovies
                .slice(1)
                .slice(index2 * 6, index2 * 6 + 6)
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
              <BiSolidLeftArrow
                size={50}
                onClick={increaseIndex3}
                style={{
                  position: 'absolute',
                  left: '10px', // 오른쪽으로 10px 이동
                  top: '50%', // 수직 가운데 정렬
                  transform: 'translateY(-50%)', // 수직 가운데 정렬(top: '50%'만 하면 정확히 정렬되지 않을 수 있어서 사용)
                  cursor: 'pointer',
                }}
              />
              <BiSolidRightArrow
                size={50}
                onClick={increaseIndex2}
                style={{
                  position: 'absolute',
                  right: '10px', // 오른쪽으로 10px 이동
                  top: '50%', // 수직 가운데 정렬
                  transform: 'translateY(-50%)', // 수직 가운데 정렬(top: '50%'만 하면 정확히 정렬되지 않을 수 있어서 사용)
                  cursor: 'pointer',
                }}
              />
            </Row>
          </AnimatePresence>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.movieId}>
                  {clickedNewMovie && (
                    <>
                      <BigCover>
                        <img
                          src={`https://www.themoviedb.org/t/p/w500/${clickedNewMovie.backdrop_path}`}
                          alt={clickedNewMovie.title}
                        />
                      </BigCover>
                      <BigTitle>{clickedNewMovie.title}</BigTitle>
                      <ButtonContainer>
                        <ButtonCore theme='mainPlay'>
                          <BsFillPlayFill size='30' />
                          재생
                        </ButtonCore>
                        <BsPlusCircle size={47} />
                        <BsHandThumbsUpFill size={47} />
                      </ButtonContainer>
                      <BigOverview>{clickedNewMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </Slider>
        <Slider>
          <MainTitleContainer>지금 뜨는 컨텐츠</MainTitleContainer>
          {/* <BiSolidRightArrow size={50} onClick={increaseIndex3} /> */}
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              transition={{ type: 'tween', duration: 1 }}
              key={index3}
            >
              {trendingMovies
                .slice(1)
                .slice(index3 * 6, index3 * 6 + 6)
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
                    style={{
                      backgroundSize: '70%',
                    }}
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
              <BiSolidLeftArrow
                size={50}
                onClick={increaseIndex3}
                style={{
                  position: 'absolute',
                  left: '10px', // 오른쪽으로 10px 이동
                  top: '50%', // 수직 가운데 정렬
                  transform: 'translateY(-50%)', // 수직 가운데 정렬(top: '50%'만 하면 정확히 정렬되지 않을 수 있어서 사용)
                  cursor: 'pointer',
                }}
              />
              <BiSolidRightArrow
                size={50}
                onClick={increaseIndex3}
                style={{
                  position: 'absolute',
                  right: '10px', // 오른쪽으로 10px 이동
                  top: '50%', // 수직 가운데 정렬
                  transform: 'translateY(-50%)', // 수직 가운데 정렬(top: '50%'만 하면 정확히 정렬되지 않을 수 있어서 사용)
                  cursor: 'pointer',
                }}
              />
            </Row>
          </AnimatePresence>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.movieId}>
                  {clickedTrendingMovie && (
                    <>
                      <BigCover>
                        <img
                          src={`https://www.themoviedb.org/t/p/w500/${clickedTrendingMovie.backdrop_path}`}
                          alt={clickedTrendingMovie.title}
                        />
                      </BigCover>
                      <BigTitle>{clickedTrendingMovie.title}</BigTitle>
                      <ButtonContainer>
                        <ButtonCore theme='mainPlay'>
                          <BsFillPlayFill size='30' />
                          재생
                        </ButtonCore>
                        <BsPlusCircle size={47} />
                        <BsHandThumbsUpFill size={47} />
                      </ButtonContainer>
                      <BigOverview>{clickedTrendingMovie.overview}</BigOverview>
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
  /* display: flex; */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  /* height: 100vh; */
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
  background-size: cover;
  background-position: center center;
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

// Box 내 Row - motion(상태 3가지 - 안보일 때, 보일 때, 사라질 때)
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
  width: 258px;
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
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
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
  object-fit: cover;
  z-index: 999;
  border: 1px solid red;

  /* background-color: #fff; */
  background-color: rgba(0, 0, 0, 0.7);
`;

// const overlayVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0 },
// };

const BigCover = styled.div`
  position: relative;
  img {
    width: 100%; /* 원하는 너비 설정 */
    height: auto; /* 자동으로 높이 조절 */
    object-fit: cover;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent, black);
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
