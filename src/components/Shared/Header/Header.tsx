import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { setSearchTerm } from '../../../redux/features/userSlice'

const Header = () => {
    const [searchterm, setSearchterm] = useState<string>('')
    const { user, audio } = useSelector((state: any) => state.user)
    const { artist, artistname } = useSelector((state: any) => state.artist)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState([])



    const getItems = async (e:any) => {
        e.preventDefault()
        // let headersList = {
        //     "auth-token": user.authtoken,
        //     "Content-Type": "application/json"
        // }

        // let bodyContent = JSON.stringify({
        //     "name": searchterm,
        // });

        // let response = await fetch("http://localhost:5000/api/songs/searchsong/", {
        //     method: "POST",
        //     body: bodyContent,
        //     headers: headersList
        // });

        // let data = await response.json();
        // setData(data)
        // // dispatch(setSearcheditems(data))
        // console.log(data);
        dispatch(setSearchTerm(searchterm))
        navigate("/search")

    }


    return (
        <div className="headerholder" id="headerholder">
            <form onSubmit={(e)=>{
                getItems(e)
            }} style={{width:'inherit'}}>

                <div className="inputholder">

                    <input type="text" className='input' value={searchterm} onChange={(e) => {
                        setSearchterm(e.target.value)
                    }} />

                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </form>

            {/* <div className="additionalTab" id="additionalTab">
                {artistname}
            </div> */}


            <div className="usernameholder">
                {user?.uname}
            </div>
        </div>
    )
}

export default Header