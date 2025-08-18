import { Link } from "react-router-dom"
import {useEffect} from "react"
import PageNotFoundImage from '../assets/pagenotfound.png'
export const PageNotFound = () => {
  useEffect(()=>{
    document.title="Page not found | Cinemate"
  },[])
  return (
    <main>
      <section className="flex flex-col justify-center px-2">
        <div className="flex flex-col items-center my-4">
          <p className="text-7xl text-gray-700 font-bold my-10 dark:text-white">404, Oops!</p>
          <div className="max-w-lg">
            <img src={PageNotFoundImage} className="rounded" alt="No page found with give address"/>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <Link to="/">
            <button className="w-64 text-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg px-5 py-2.5 dark:text-white mr-2 mb-2">Back to cinemate</button>
          </Link>
        </div>
      </section>
    </main>
  )
}
