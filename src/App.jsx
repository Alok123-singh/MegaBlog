import './index.css'
import {Header, Footer} from './components/index.js'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice.js'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
        if(userData){
            dispatch(login(userData));
        }
        else{
            dispatch(logout());
        }
    })
    .catch(() => console.log("Appwrite : Error in recieving info about current user."))
    .finally(() => setLoading(false));

  },[]);


  return !loading ? (
    <div className='min-h-screen w-full content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) :
  
  (

    <div className='bg-blue-400 flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>

  ) 
}

export default App
