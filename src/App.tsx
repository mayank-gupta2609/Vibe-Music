import React, { useEffect, useState } from 'react'
import Main from './components/Main'
import { useSelector, useDispatch } from "react-redux";
import Login from './components/Pages/Login/Login';
import { useNavigate } from 'react-router';
import { setUser } from './redux/features/userSlice';
import Loader from './components/Shared/Loader/Loader';

const App = () => {

  // const { user } = useSelector((state: any) => state.user)
  const authtoken: string = localStorage.getItem('authtoken')!
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true)



  const getUser = async () => {

    setLoading(true)
    let headersList = {
      "auth-token": authtoken
    }

    let response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: headersList
    });

    let data = await response.json();
    const user = {
      uid: data.uid,
      uname: data.uname,
      authtoken: data.authtoken
    }
    dispatch(setUser(user))
    console.log(data.authtoken);
    localStorage.setItem("authtoken", data.authtoken)
    setLoading(false)

  }


  if (authtoken === null) return <Login/>
  useEffect(() => {
    
    getUser()
  }, [])




  // if (authtoken === null) {
  //   return <Login></Login>
  // }
  return (
    <div>
      {loading && <Loader></Loader>}
      {!loading && <Main></Main>}


    </div>
  )
}

export default App

