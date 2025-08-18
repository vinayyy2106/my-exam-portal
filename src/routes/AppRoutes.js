import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MovieDetail, MovieList, PageNotFound, Search } from '../pages'
const AppRoutes = () => {
  return (
    <div className="dark:bg-darkbg">
    <Routes>
            <Route path='/' element={<MovieList api="movie/now_playing" title="Home"/>}/>
            <Route path='title/:id' element={<MovieDetail/>}/>
            <Route path='movies/upcoming' element={<MovieList api="movie/upcoming" title="Upcoming"/>}/>
            <Route path='movies/top' element={<MovieList api="movie/top_rated" title="Top Rated"/>}/>
            <Route path='movies/popular' element={<MovieList api="movie/popular" title="Popular"/>}/>
            <Route path='search' element={<Search api="search/movie"/>}/>
            <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </div>
    
  )
}
export default AppRoutes


