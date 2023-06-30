import React, { useState } from 'react'
import './Login.css'
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../../../redux/features/userSlice';
import { useNavigate } from 'react-router';



const Login = () => {

    const [signUp, setSignUp] = useState<boolean>(false)
    const [uname, setUname] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.user)
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");

    let token = "";
    const loginRequest = async (e: Event) => {
        //console.log(document.cookie)
        e.preventDefault();
        //console.log(email)
        //console.log(password)
        const resposnse = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'credentials': 'same-origin',
            },
            body: JSON.stringify({ email: email, password: password }),

        });

        const json = await resposnse.json();
        //console.log(json)
        if (json.success) {
            token = json.authtoken;
            localStorage.setItem('authtoken', token);
            // const user = {
            //     uid: json.uid,
            //     uname: json.uname
            // }
            // dispatch(setUser(user)) 
            window.location.reload() 


        }
        else {
            alert("Invalid credentials");
        }
    }

    const signUpRequest = async (e: Event) => {
        e.preventDefault();
        const resposnse = await fetch("http://localhost:5000/api/auth/adduser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: uname, email: email, password: password })
        });

        const json = await resposnse.json();
        console.log(json)
        if (json.authtoken) {
            token = json.authtoken;
            localStorage.setItem('authtoken', token);
            // const user = json
            // dispatch(setUser(user))
            //console.log(json)
            // //console.log(playlists) 
            // navigate("/")
            window.location.reload()
        }


    }


    return (
        <div className="login-holder">
            {signUp === false ?
                <form onSubmit={(e: any) => loginRequest(e)}
                // autoComplete="true"
                >

                    <div className="login-div">
                        <div className="welcome">
                            Login
                        </div>

                        <div className="usernameinput">
                            <div className="usernametext">
                                E-mail
                            </div>
                            <div className="uname">
                                <input type="text" className='logininput' value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="passwordinput">
                            <div className="passwordtext">
                                Password
                            </div>

                            <div className="pwd">

                                <input type="password" className='logininput' value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>
                        </div>
                        <button className="login-button" style={{
                            opacity: email.length > 4 && password.length > 6 ? '1' : '0.4',
                        }} disabled={email.length < 4 && password.length < 6} >Login</button>
                        <span className="signup">Don't have a account ?
                            <span className="signupspan" onClick={() => {
                                setSignUp(true)
                            }}>
                                Sign Up
                            </span>
                        </span>
                    </div>
                </form>
                :
                <form onSubmit={(e: any) => signUpRequest(e)} >

                    <div className="login-div">
                        <div className="welcome">
                            Sign Up
                        </div>

                        <div className="usernameinput">
                            <div className="usernametext">
                                Username
                            </div>
                            <div className="uname">
                                <input type="text" className='logininput' value={uname} onChange={(e) => {
                                    setUname(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="passwordinput">
                            <div className="passwordtext">
                                Password
                            </div>

                            <div className="pwd">

                                <input type="password" className='logininput' value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="passwordinput">
                            <div className="passwordtext">
                                Email
                            </div>

                            <div className="pwd">

                                <input type="text" className='logininput' value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>
                        </div>
                        <button className="login-button" style={{
                            opacity: uname.length > 4 && password.length > 6 ? '1' : '0.4',
                        }} disabled={uname.length < 4 && password.length < 6 && email.length < 4}>Sign Up</button>


                    </div>
                </form>
            }

        </div>
    )
}

export default Login
