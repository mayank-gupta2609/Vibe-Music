import React, { useEffect, useState } from 'react'
import {
    collection,
    doc,
    orderBy,
    query,
    setDoc,
    Timestamp,
    addDoc,
    where, deleteDoc, updateDoc, DocumentData, QueryDocumentSnapshot, getDocs
} from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import SongCard from '../../Shared/SongCard/SongCard';
import { useDispatch, useSelector } from 'react-redux';
import { setLikedsongs } from '../../../redux/features/userSlice';
import { settracks } from '../../../redux/features/albumSlice';

const Home = () => {
    const [songs, setSongs] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch();
    const { user } = useSelector((state:any) => state.user)

    React.useEffect(() => {

        const div = document.getElementById('home-container')
        // const add = document.getElementById("additionalTab")
        div?.addEventListener("scroll", () => {
            // console.log(div.scrollTop)
            let t: number = div.scrollTop / 150
            console.log(t)
            document.getElementById("headerholder")?.style.setProperty("--alpha", "1")
            document.getElementById("additionalTab")?.style.setProperty("--opacity", "0")
        })

    }, [])


    const getSongs = async () => {
        setLoading(true)
        let data = await fetch('http://localhost:5000/api/songs/getallsongs');
        let response = await data.json();
        console.log(response)
        settracks(response);
        setLoading(false)
        setSongs(response)
    }

    const getLikedSongs = async () => {
        setLoading(true)
        let headersList = {
            "Content-Type": "application/json"
        }


        let response = await fetch(`http://localhost:5000/api/likedsongs/getlikedsongs/${user.uid}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        dispatch(setLikedsongs(data.ids));  
        setLoading(false)
    }


    useEffect(() => {
        getSongs()
    }, [])

    return (
        <div className="home-container" id="home-container">
            <h1>
                Listen Again
            </h1>


            <div className="holder">
                {songs?.map((song: any) => {
                    return <SongCard key={song._id} song={song}></SongCard>
                })}
            </div>

            <h1>Trending</h1>
            <div className="holder">
                {songs?.map((song: any) => {
                    return <SongCard key={song._id} song={song}></SongCard>
                })}
            </div>
        </div>
    )
}

export default Home
