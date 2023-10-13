import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsPlayCircleFill, BsHandThumbsUp } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import ReactModal from 'react-modal';

const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 이미지 정보를 저장할 상태

  const getMovie = () => {
    fetch(
      'http://api.themoviedb.org/3/discover/movie?api_key=dceedc8f6b866424573e71f33be7a911'
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  // 모달
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showModal = (movie) => {
    setSelectedMovie(movie); // 선택된 이미지 정보 설정
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null); // 모달이 닫힐 때 선택된 이미지 정보 초기화
    setModalIsOpen(false);
  };

  return (
    <div>
      {modalIsOpen ? (
        <ModalContainer
          isOpen={true}
          ariaHideApp={false}
          onRequestClose={closeModal}
        >
          <ModalContent>
            {selectedMovie && ( // 선택된 이미지가 있을 때만 표시
              <ImageWrapper>
                <Image
                  src={`http://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                />
              </ImageWrapper>
            )}
            <ButtonContainer>
              <button>
                <BsPlayCircleFill size={40} backgroundColor='transparent' />
              </button>
              <button>
                <AiOutlinePlusCircle size={45} />
              </button>
              <button>
                <BsHandThumbsUp size={32} />
              </button>
            </ButtonContainer>
            <TextContainer>
              <div> 89% 일치</div>
              <div>1시간 40분</div>
            </TextContainer>
          </ModalContent>
        </ModalContainer>
      ) : (
        <MovieContainer>
          {movieList.map((movie) => (
            <button
              key={movie.id}
              style={{
                border: 'none',
                padding: 0,
                backgroundColor: 'transparent',
              }}
              onClick={() => showModal(movie)}
            >
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  marginLeft: '10px',
                  marginTop: '10px',
                }}
                src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </button>
          ))}
        </MovieContainer>
      )}
    </div>
  );
};

export default Movie;

const MovieContainer = styled.div`
  /* margin-left: auto; */
  /* margin-right: auto; */
  /* float: left; */
`;

const ModalContainer = styled(ReactModal)`
  width: 50%;
  height: 100vh;
  margin-top: 0.5%;
  margin-left: auto;
  margin-right: auto;
  background-color: black;
  font-size: 16px;
  border-radius: 10px;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
`;

const ModalContent = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  border: none;
  background-color: transparent;
  border-radius: 50px;
  padding: 20px 10px;
  /* display: none; */
`;

const TextContainer = styled.div`
  padding: 3px 10px;
`;

const ImageWrapper = styled.div`
  width: 95%; /* 원하는 너비로 설정 */
  height: 500px; /* 원하는 높이로 설정 */
  overflow: hidden; /* 이미지를 부모 요소의 영역 내에서 자르기 */
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%; /* 부모 요소의 너비를 100%로 채움 */
  height: 100%; /* 부모 요소의 높이를 100%로 채움 */
  object-fit: cover; /* 이미지를 적절하게 자름 */
  object-position: center; /* 이미지를 가운데 정렬 (선택사항) */
`;
