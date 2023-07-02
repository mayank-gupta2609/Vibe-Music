import React from 'react'
import { Router, Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from '../../Pages/Home/Home'
import Search from '../../Pages/Search/Search'
import './PageContent.css'
import PlaylistPage from '../../Pages/Playlist/PlaylistPage'
import LikedSongs from '../../Pages/Liked Songs/LikedSongs'
import AlbumPage from '../../Pages/Album Page/AlbumPage'
import History from '../../Pages/History/History'
import Artist from '../../Pages/Artist Page/Artist'
import ArtistDetail from '../../Pages/Artist Page/ArtistDetail'



const PageContent = () => {
    return (
        <div className="page-content">
            {/* <Router> */}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="search" element={<Search />}></Route>
                <Route path="/playlist/:id" element={<PlaylistPage/>}></Route>
                <Route path="/likedsongs" element={<LikedSongs/>}></Route>
                <Route path="/album/:id" element={<AlbumPage/>}></Route>
                <Route path="history" element={<History />}></Route>
                <Route path="artists" element={< Artist />}></Route>
                <Route path="artists/:id" element={< ArtistDetail />}></Route>
                <Route path="album/:id" element={< AlbumPage />}></Route>
            </Routes>
            {/* </Router> */} 
        </div>
    )
}

export default PageContent
