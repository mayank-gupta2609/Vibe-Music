import React from 'react'
import "./Sidebar.css"
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setAudio, setLikedsongs, setLikesList, setSongIndex, setSongsList, setTracklist } from '../../../redux/features/userSlice'
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
  const [name, setName] = React.useState<string>("")
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
    //console.log(data)
    setLikes(data.songs)
    //console.log(data.ids);
    setItemLoading(false)
  }

  const getHistory = async () => {
    // setLoading(true)
    let headersList = {
      "Content-Type": "application/json"
    }

    try {

      let response = await fetch(`http://localhost:5000/api/history/gethistory/${user?.uid}`, {
        method: "GET",
        headers: headersList
      });

      let data = await response.json();

      setHistory(data.songs)
    } catch (err) {
      console.log(err)
    }

    // setLoading(false)

  }

  const addPlaylist = async (e: any) => {
    e.preventDefault();
    let headersList = {
      "Content-Type": "application/json",
      "auth-token": user.authtoken
    }

    let bodyContent = JSON.stringify({
      "name": name,
      "track": []
    });

    let response = await fetch("http://localhost:5000/api/playlists/addplaylist", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    getPlaylists()
  }

  const authtoken: string = localStorage.getItem('authtoken')!
  const getPlaylists = async () => {
    // //console.log(user.authtoken)
    // setLoading(true)
    let headersList = {
      "auth-token": user.authtoken
    }

    let response = await fetch(`http://localhost:5000/api/playlists/getallplaylists/${user?.uid}`, {
      method: "GET",
      headers: headersList
    });


    let data = await response.json();

    //console.log(data);
    setPlaylist(data)
    // setLoading(false)

  }

  // const clearHistory = async () => {
  //   console.log("object")
  //   let headersList = {
  //     "auth-token": user?.authtoken,
  //     "Content-Type": "application/json"
  //   }

  //   await fetch(`api/history/clearhistory/${user?.uid}`, {
  //     method: "POST",
  //     headers: headersList
  //   });


  //   getHistory()
  // }

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
          }}
            style={{
              border: request === "likes" ? "1px solid white":""
            }}

          >Liked</div>
          <div className="libOptions" onClick={() => {
            setRequest("history")
          }}
            style={{
              border: request === "history" ? "1px solid white":""
            }}

          >History</div>
          <div className="libOptions" onClick={() => {
            setRequest("playlist")
          }}
            style={{
              border: request === "playlist" ? "1px solid white":""
            }}

          > Playlists</div>

        </div>
        <div className="libContent">
          <div className="libContentHolder">


            {request === "likes" && (likeslist?.length > 0 ?
              likeslist?.map((m: any, index: number) => {
                return <div className="musicItem" key={m?._id} onClick={() => {
                  dispatch(setAudio(m))
                  dispatch(setSongsList(likeslist))
                  dispatch(setSongIndex(index))
                }}
                >
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
                <div className='historycontrols'>

                  <i className="fa-solid fa-arrows-rotate refresh" onClick={() => {
                    getHistory()
                  }}></i> 
                </div>
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
              <div className="playlists">
                <i className="fa-solid fa-arrows-rotate historycontrols" onClick={() => {
                  getPlaylists()
                }}></i>
                <div className="playlistscontent">

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
                <form onSubmit={(e: any) => {
                  addPlaylist(e)
                }} >

                  <input type="text" className="addplaylist" placeholder='Add a Playlist' value={name} onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  />
                </form>
              </div>

            }
          </div>
        </div>
      </div>

    </div >
  )
}

export default Sidebar
