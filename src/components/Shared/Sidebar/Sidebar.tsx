import React from 'react'
import "./Sidebar.css"
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setAudio, setLikedsongs, setLikesList } from '../../../redux/features/userSlice'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import MusicItemloader from '../Loader/MusicItemloader'

const Sidebar = () => {
  const music = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  const [likes, setLikes] = React.useState([])
  const [history, setHistory] = React.useState([])
  const [playlist, setPlaylist] = React.useState([])
  const { user, likedsongs, likeslist } = useSelector((state: any) => state.user)
  const [request, setRequest] = React.useState<string>("likes")
  const dispatch = useDispatch();
  const [likedsongslist, setlikedsongslist] = React.useState([])
  const location = useLocation();
  const [itemloading, setItemLoading] = React.useState<boolean>(true)

  const getLikedSongs = async () => {
    setItemLoading(true)
    let headersList = {
      "Content-Type": "application/json"
    }

    let response = await fetch(`http://localhost:5000/api/likedsongs/getlikedsongs/${user?.uid}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    dispatch(setLikedsongs(data.ids));
    dispatch(setLikesList(data.songs));
    setlikedsongslist(data.songs)
    console.log(data)
    setLikes(data.songs)
    console.log(data.ids);
    setItemLoading(false)
  }

  const getHistory = async () => {
    // setLoading(true)
    let headersList = {
      "Content-Type": "application/json"
    }

    let response = await fetch(`http://localhost:5000/api/history/gethistory/${user?.uid}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();


    console.log(data)
    // setHid(data.history[0]._id)
    setHistory(data.songs)

    // setLoading(false)

  }

  const authtoken: string = localStorage.getItem('authtoken')!
  const getPlaylists = async () => {
    // console.log(user.authtoken)
    // setLoading(true)
    let headersList = {
      "auth-token": authtoken
    }

    let response = await fetch(`http://localhost:5000/api/playlists/getallplaylists/${user?.uid}`, {
      method: "GET",
      headers: headersList
    });


    let data = await response.json();

    console.log(data);
    setPlaylist(data)
    // setLoading(false)

  }

  React.useEffect(() => {
    // getLikes()
    getHistory()
    getPlaylists()
    getLikedSongs()
  }, [])

  return (
    <div className="sideContainer">
      <div className="upperContent">
        <div className="navHolder">
          <div className="navOptions">
            <Link className="text-link" to="" style={{ color: location.pathname.split("/")[1] === "" ? "whitesmoke" : "grey", textDecoration: 'none' }}>
              <i className="fa-solid fa-house"></i>Home
            </Link>
          </div>
          <div className="navOptions">
            <Link className="text-link" to="search" style={{ color: location.pathname.split("/")[1] === "search" ? "whitesmoke" : "grey", textDecoration: 'none' }}>
              <i className="fa-solid fa-magnifying-glass"></i>Search
            </Link>
          </div>
        </div>
      </div>
      <div className="lowerContent">
        <div className="libOptionHolder">
          <div className="libOptions" onClick={() => {
            setRequest("likes")
          }}>Liked</div>
          <div className="libOptions" onClick={() => {
            setRequest("history")
          }}>History</div>
          <div className="libOptions" onClick={() => {
            setRequest("playlist")
          }}> Playlists</div>

        </div>
        <div className="libContent">
          <div className="libContentHolder">


            {request === "likes" && (likeslist?.length > 0 ?
              likeslist?.map((m: any) => {
                return <div className="musicItem" key={m?._id} onClick={() => {
                  dispatch(setAudio(m))
                }}>
                  <img src={m?.img} height="100%" alt="" />

                  <div className="musicItemMusicDetails">
                    <div className="musicItemMusicName">
                      {m?.name}
                    </div>
                    <div className="musicItemArtistDiv">
                      {m?.artist?.join(",")}
                    </div>
                  </div>
                </div>
              }) : itemloading === true ? <div>
                <MusicItemloader></MusicItemloader>
                <MusicItemloader></MusicItemloader>
                <MusicItemloader></MusicItemloader>
                <MusicItemloader></MusicItemloader>
              </div> : <div className="infomsg">
                No liked songs, maybe hear some songs
              </div>)

            }

            {request === "history" &&

              <div>
                <i className="fa-solid fa-arrows-rotate refresh" onClick={() => {
                  getHistory()
                }}></i>
                {history.length > 0 ? history?.map((m: any) => {
                  return <div className="musicItem">
                    <img src={m?.img} height="100%" alt="" />

                    <div className="musicItemMusicDetails">
                      <div className="musicItemMusicName">
                        {m.name}
                      </div>
                      <div className="musicItemArtistDiv">
                        {m.artist.join(",")}
                      </div>
                    </div>
                  </div>
                }) : <div className="infomsg">
                  Nothing to show
                </div>}
              </div>

            }

            {request === "playlist" &&
              <div>
                <i className="fa-solid fa-arrows-rotate refresh" onClick={() => {
                  getPlaylists()
                }}></i>
                {playlist.length > 0 ? playlist?.map((m: any) => {
                  return <div className="musicItem">
                    <Link className="text-link" to={`/playlist/${m._id}`}>
                      <div className="musicItemMusicDetails">
                        <div className="musicItemMusicName">
                          {m?.name}
                        </div>
                        <div className="musicItemArtistDiv">
                          {m?.tracks.length} songs
                        </div>
                      </div>
                    </Link>
                  </div>
                }) : <div className="infomsg">No Playlists to show</div>}
              </div>

            }
          </div>
        </div>
      </div>

    </div >
  )
}

export default Sidebar