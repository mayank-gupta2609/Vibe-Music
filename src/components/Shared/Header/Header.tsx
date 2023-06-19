import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'

const Header = () => {
    const { user } = useSelector((state:any) => state.user)
    return (
        <div className="headerholder" id="headerholder">
            <div className="inputholder">
                <input type="text" className='input' />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <div className="additionalTab" id="additionalTab">
                aadfa
            </div>


            <div className="usernameholder">
                {user.uname}
            </div>
        </div>
    )
}

export default Header
