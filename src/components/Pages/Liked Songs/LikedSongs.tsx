import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { db } from '../../../firebaseConfig';

const LikedSongs = () => {

    const [likes, setLikes] = React.useState([])

    const getSongs = async () => {
        const querySnapshot = await getDocs(collection(db, "Test Audio Files"));
        let data: any = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots 
            data.push(doc.data())
        });
        //console.log(data)
        setLikes(data)
    }

    React.useEffect(() => {

        const div = document.getElementById('playlist-container')
        // const add = document.getElementById("additionalTab")
        div?.addEventListener("scroll", () => {
            // //console.log(div.scrollTop)
            let t: number = div.scrollTop / 220
            //console.log(t)
            document.getElementById("headerholder")?.style.setProperty("--alpha", t.toString())
            document.getElementById("additionalTab")?.style.setProperty("--opacity", t.toString())
        })



    }, [])

    return (
        <div className="playlist-container">
            <div className="playlistheader">
                <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" height="100%" alt="" />

                <div className="playlistheaderdetails">
                    <div className="playlistheadername">
                        Liked Songs
                    </div>
                    <div className="playlistheadercount">
                        12 Songs
                    </div>
                </div>
            </div>

            <div className="playlistinforow">
                <div className="playlistinfoserialno">#</div>
                <div className="playlistinfoname">Name</div>
                {/* <div className="playlistinfoduration">Duration</div> */}
            </div>


            <div className="playlistsongdetail">
                <div className="playlistinfoserialno">1</div>
                <div className="playlistinfoname">Music 1 name</div>
                {/* <div className="playlistinfoduration">4:44</div> */}
                <i className="fa-solid fa-heart"></i>
            </div>
            <div className="playlistsongdetail">
                <div className="playlistinfoserialno">1</div>
                <div className="playlistinfoname">Music 1 name</div>
                {/* <div className="playlistinfoduration">4:44</div> */}
                <i className="fa-solid fa-heart"></i>
            </div>


        </div>
    )
}

export default LikedSongs
