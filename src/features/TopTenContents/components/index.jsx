import Slider from 'react-slick';
import { motion } from 'framer-motion';

import styled from 'styled-components';

import Movie from '../../../components/Movie';

export default function TopTenContents() {
  // const movies = [{}];

  // return (
  //   <Container>
  //     <Slider
  //       {...{
  //         // dots: true,
  //         infinite: true,
  //         speed: 500,
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         // key: movies.id,
  //       }}
  //     >
  //       {movies.map((movie) => (
  //         <Movie key={movie.id} movieData={movie} />
  //       ))}
  //     </Slider>
  //   </Container>
  return null;
}

const Box = styled.div`
  /* width: 100px; */
  /* height: 100px; */
  /* background-color: #ddd; */
  color: black;
`;

const Container = styled.div`
  .slick-prev {
    left: 100px;
    /* border: 1px solid red; */
    background-color: red;
  }

  .slick-next {
    right: 100px;
    /* border: 1px solid red; */
    background-color: red;
  }
`;

const Slidervertwo = styled.div``;

const Row = styled(motion.div)``;
