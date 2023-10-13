import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Language from '../pages/Language';
import Movies from '../pages/Movies';
import MyPick from '../pages/MyPick';
import NowNewContents from '../pages/NowNewContents';
import Series from '../pages/Series';
import MainHeader from './headers/MainHeader';
import Practice from '../features/practice/components';
import SubHeader from './headers/SubHeader';

const Router = () => {
  return (
    <BrowserRouter>
      <MainHeader />
      {/* <SubHeader /> */}
      <Routes>
        <Route path='/browse' element={<Practice />}></Route>
      </Routes>
      <Routes>
        <Route path='/browse/genre' element={<Series />}></Route>
      </Routes>
      <Routes>
        <Route path='/browse/movie' element={<Movies />}></Route>
      </Routes>
      <Routes>
        <Route path='/latest' element={<NowNewContents />}></Route>
      </Routes>
      <Routes>
        <Route path='/browse/my-list' element={<MyPick />}></Route>
      </Routes>
      <Routes>
        <Route path='/browse/original-audio' element={<Language />}></Route>
      </Routes>
      <Routes>
        <Route path='/browse/:movieId' element={<Practice />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
