import React from 'react'
import "./Sidebar.css"
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setLikedsongs } from '../../../redux/features/userSlice'

const Sidebar = () => {
  const music = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  const [likes, setLikes] = React.useState([])
  const [history, setHistory] = React.useState([])
  const [playlist, setPlaylist] = React.useState([])
  const { user } = useSelector((state: any) => state.user)
  const [request, setRequest] = React.useState<string>("likes")
  const dispatch = useDispatch();
  
  const getLikedSongs = async () => { 
    let headersList = {
        "Content-Type": "application/json"
    }


    let response = await fetch(`http://localhost:5000/api/likedsongs/getlikedsongs/${user.uid}`, {
        method: "GET",
        headers: headersList
    });

    let data = await response.json();
    dispatch(setLikedsongs(data.ids));
    setLikes(data.songs)
    console.log(data.ids); 
}

  const getHistory = async () => {
    const docRef = doc(db, "History", user.username);
    let data: any = []
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data().history);
      setHistory(docSnap.data().history)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const getPlaylists = async () => {
    const docRef = doc(db, "Playlists", user.username);
    let data: any = []
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data().playlists);
      setPlaylist(docSnap.data().playlists)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  React.useEffect(() => {
    // getLikes()
    // getHistory()
    // getPlaylists()
    getLikedSongs()
  }, [])

  return (
    <div className="sideContainer">
      <div className="upperContent">
        <div className="navHolder">
          <div className="navOptions"> <i className="fa-solid fa-house"></i>Home</div>
          <div className="navOptions"><i className="fa-solid fa-magnifying-glass"></i>Search</div>
        </div>
      </div>
      <div className="lowerContent">
        <div className="libOptionHolder">
          <div className="libOptions" onClick={()=>{
            setRequest("likes")
          }}>Liked</div>
          <div className="libOptions" onClick={()=>{
            setRequest("history")
          }}>History</div>
          <div className="libOptions" onClick={()=>{
            setRequest("playlist")
          }}> Playlists</div>

        </div>
        <div className="libContent">
          <div className="libContentHolder">
            {request === "likes" && (likes.length > 0 ?
              likes?.map((m) => {
                return <div className="musicItem">
                  <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" height="100%" alt="" />

                  <div className="musicItemMusicDetails">
                    <div className="musicItemMusicName">
                      This Holds the Music Name
                    </div>
                    <div className="musicItemArtistDiv">
                      This Holds the Artist
                    </div>
                  </div>
                </div>
              }) : <div className="infomsg">
                No liked songs, maybe hear some songs
              </div>)

            }
            {request === "history" &&
              (history.length > 0 ? history?.map((m) => {
                return <div className="musicItem">
                  <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" height="100%" alt="" />

                  <div className="musicItemMusicDetails">
                    <div className="musicItemMusicName">
                      This Holds the Music Name
                    </div>
                    <div className="musicItemArtistDiv">
                      This Holds the Artist
                    </div>
                  </div>
                </div>
              }) : <div className="infomsg">
                Nothing to show
              </div>)

            }
            {request === "playlist" &&
              (playlist.length > 0 ? playlist?.map((m) => {
                return <div className="musicItem">
                  <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" height="100%" alt="" />

                  <div className="musicItemMusicDetails">
                    <div className="musicItemMusicName">
                      This Holds the Music Name
                    </div>
                    <div className="musicItemArtistDiv">
                      This Holds the Artist
                    </div>
                  </div>
                </div>
              }) : <div className="infomsg">No PLaylists to show</div>)

            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sidebar
