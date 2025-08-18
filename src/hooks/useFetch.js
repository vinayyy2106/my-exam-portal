import React, {useState,useEffect} from 'react'

export const useFetch = (api,queryTerm="") => {
    const [data,setData]=useState([]);
    const url=`https://api.themoviedb.org/3/${api}?api_key=${process.env.REACT_APP_API_KEY}&query=${queryTerm}`
      async function fetchMovies() {
          const response=await fetch(url);
          const data=await response.json();
          setData(data.results)
        }
      useEffect(()=>{
        fetchMovies()
    },[url])
  return  {data};
}


