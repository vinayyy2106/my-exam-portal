import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { useFetch } from '../hooks/useFetch'
import {useEffect} from 'react'
export const Search = ({api}) => {
  const [searchParams]=useSearchParams()
  const queryTerm=searchParams.get("q")
  const {data:movies}=useFetch(api,queryTerm)
  useEffect(()=>{
    document.title=`Search results for ${queryTerm} | Cinemate`
  },[])
  return (
    <main>
      <section className="p-7">
        <p className="text-3xl text-gray-700 dark:text-white">
          {movies.length===0? `No results found for '${queryTerm}'`:`Results for '${queryTerm}'`}
        </p>
      </section>
      <section className="max-w-7xl py-7 mx-auto">
        <div className="flex justify-start flex-wrap">
          {movies && movies.map((movie,index)=>(
            <Card key={index} movie={movie}/>
          ))}
        </div>
      </section>
    </main>
  )
}
