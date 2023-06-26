import React, { useEffect, useState } from 'react'
import Sidebar from './Shared/Sidebar/Sidebar'
import Player from './Shared/Player/Player'
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
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from '../firebaseConfig'
import { useCollection } from "react-firebase-hooks/firestore";
import SongCard from './Shared/SongCard/SongCard';
import Header from './Shared/Header/Header';
import PageContent from './Shared/PageContent/PageContent';

const Main = () => {
    const [songs, setSongs] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { audio } = useSelector((state: any) => state.user)

    return (
        <div className="container">
            <div className="sidebar">
                <Sidebar></Sidebar>
            </div>

            <div className="content">
                <Header></Header>
                <PageContent></PageContent>
                
                <div className="playerholder" id="playerholder">
                    <Player></Player>
                </div>
            </div>
        </div>
    )
}

export default Main
