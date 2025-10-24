import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toast'
import Loading from '../components/Loading'
import CryptoJS from 'crypto-js';
import { Dashboard } from './Dashboard';
export const Home = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {isLoading && <Loading />}
      <div>
        <Dashboard />
      </div>
    </>

  )
}


