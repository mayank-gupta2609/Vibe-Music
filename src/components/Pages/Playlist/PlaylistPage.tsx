import React from 'react'
import "./Playlistpage.css"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { setSongsList, setSongIndex, setAudio } from '../../../redux/features/userSlice'

const PlaylistPage = () => {
    const { user, audio, searchedterm, songIndex, songslist } = useSelector((state: any) => state.user)
    const [playlist, setPlaylist] = useState<any>([])
    const [tracks, setTracks] = useState<any>([])
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [searcheditems, setSearchedItems] = useState<any[]>([])
    const [playlistid, setPlaylistId] = useState<string>("")
    const url = window.location
    const location = useLocation();
    const dispatch = useDispatch()
    const authtoken: string = localStorage.getItem('authtoken')!
    // //console.log(url.pathname.split("/")[2])

    const getPlaylist = async () => {
        let headersList = {
            "auth-token": authtoken
        }

        let response = await fetch(`http://localhost:5000/api/playlists/getplaylist/${url.pathname.split("/")[2]}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        // setPlaylistname(data.playlist[0].name)
        //console.log(data.songs)
        //console.log(data.playlist);
        setPlaylist(data.playlist)
        setTracks(data.songs)
        // setTracks(data.songs)
        // setLoading(false);
    }

    const handleClick = async (track: any) => {
        //console.log("object")
        //console.log(track._id)
        //console.log(url.pathname.split("/")[2])
        let headersList = {
            "auth-token": localStorage.getItem('authtoken')!,
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "id": playlistid,
            "track": track._id
        });

        let response = await fetch("http://localhost:5000/api/playlists/addtoplaylist", {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        getPlaylist()


    }

    const fetchSearchResults = async () => {
        let headersList = {
            "auth-token": user.authtoken,
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "name": searchTerm,
        });

        let response = await fetch("http://localhost:5000/api/songs/searchsong/", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        // setData(data)
        // dispatch(setSearcheditems(data))
        setSearchedItems(data)
        //console.log(data);
    }

    useEffect(() => {
        fetchSearchResults()
    }, [searchTerm])


    useEffect(() => {
        getPlaylist()
        // //console.log(url.pathname.split("/")[2])
        setPlaylistId(url.pathname.split("/")[2])
        setSearchTerm("")
    }, [location])


    return (
        <div className="playlist-container">
            <div className="playlistheader">
                <img src={tracks[0]?.img} height="100%" alt="" />

                <div className="playlistheaderdetails">
                    <div className="playlistheadername">
                        {playlist[0]?.name}
                    </div>
                    <div className="playlistheadercount">
                        {tracks.length > 0 ? `${tracks.length} songs` : ""}
                    </div>
                </div>
            </div>

            {
                tracks.length == 0 && <div className="playlistemptyinfo">
                    Seems like the playlist is empty
                </div>
            }

            {tracks.length != 0 && <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto'
            }}>

                <div className="playlistinforow">
                    <div className="playlistinfoserialno">#</div>
                    <div className="playlistinfoname">Name</div>
                    {/* <div className="playlistinfoduration">Duration</div> */}
                </div>



                {
                    tracks.map((track: any, index: number) => {
                        return <div className="playlistsongdetail" onClick={() => {
                            dispatch(setSongsList(tracks))
                            dispatch(setSongIndex(index))
                            dispatch(setAudio(tracks[index]))
                        }}>

                            <div className="playlistinfoserialno">{index + 1}</div>
                            <img src={track.img} height="80%" alt="" />
                            <div className="playlistinfoname">{track.name}</div>
                            <div className="playlistinfoartist">

                                {track?.artist?.join(",")}
                            </div>
                            {/* <div className="playlistinfoduration">4:44</div> */}
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    })
                }
            </div>
            }

            <div className="inputforempltyplaylist">
                <div className="emptyplaylistholder">

                    <input type="text" className="addmusictoplaylist"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                        placeholder='Search for a song to add to playlist'
                    />

                    <div className="searchedsongs">

                        {searchTerm !== "" &&
                            searcheditems.map((item: any) => {
                                return <div className="searchedsongitem" onClick={() => {
                                    handleClick(item)
                                }}>
                                    <img src={item?.img} height="100%" alt="" />
                                    <div className="searchedmusicname">
                                        {item?.name}
                                    </div>

                                </div>
                            })
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}

export default PlaylistPage
