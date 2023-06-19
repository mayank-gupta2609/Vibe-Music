import React from 'react'
import Main from './components/Main'
import { useSelector, useDispatch } from "react-redux";
import Login from './components/Pages/Login/Login';

const App = () => {

  const { user } = useSelector((state: any) => state.user)

  if (!user) {
    return <Login></Login>
  }

  return (
    <div>

      <Main></Main>


    </div>
  )
}

export default App

