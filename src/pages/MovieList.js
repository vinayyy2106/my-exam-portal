import { Card } from '../components/Card'
import { useFetch } from '../hooks/useFetch'
import {useEffect} from 'react'
export const MovieList = ({api,title}) => {
  const {data:movies}=useFetch(api)
  useEffect(()=>{
    document.title=`${title} | Cinemate`;
  },[])
  return (
    <main>
      <section className="max-w-7xl py-7 mx-auto">
        <div className="flex justify-start flex-wrap other:justify-evenly">
          {movies && movies.map((movie,index)=>(
            <Card key={index} movie={movie}/>
          ))}
        </div>
      </section>
    </main>
  )
}


