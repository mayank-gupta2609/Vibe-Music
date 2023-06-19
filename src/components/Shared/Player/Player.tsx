import React, { useState } from 'react'
import './Player.css'
import Video from '../Video/Video'
import { useSelector, useDispatch } from "react-redux";
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { setLiked } from '../../../redux/features/userSlice';

const Player = () => {

    const [request, setRequest] = useState<string>("audio")
    const [aState, setAState] = useState<string>("pause")
    const [audioProgress, setAudioProgress] = useState<number>(0)
    const [expand, setExpand] = useState<boolean>(false)
    const [vState, setVState] = useState<string>("pause")
    const [liked, setLiked_] = useState<boolean>(false)
    const { audio, likedsongs } = useSelector((state: any) => state.user)
    const { user } = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const [op, setOp] = useState("addto")
    const [method, setMethod] = useState("post")
    // const { audio } = useSelector((state:any) => state.user)
    const handleLikedClick = async () => {
        const likedRef = doc(db, "Likes", user.username);

        console.log(liked)
        if (liked) {
            console.log(audio.name)
            await updateDoc(likedRef, {
                likes: arrayUnion(...[audio.id])
            });
        } else {
            await updateDoc(likedRef, {
                likes: arrayRemove(audio.name)
            });
        }
    }

    // if (a.currentTime > 0 && !a.paused) {
    //     console.log("1")
    //     a.pause();
    //     setAState("pause")
    //     // return
    // }

    // if (a.currentTime == 0 || a.paused) {
    //     setAState("play")
    //     a.play()
    //     
    //     })
    // }

    const toggleAudioState = () => {
        let audio = document.getElementById('audioplayer') as HTMLAudioElement
        const a: HTMLAudioElement = audio!;
        console.log("5")
        a?.addEventListener('timeupdate', () => {
            let time = a.currentTime / a.duration
            setAudioProgress(Math.floor(a.currentTime))
            document.getElementById('audprogindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");
        })

        a?.addEventListener('play', () => {
            setAState("play")
        })

        a?.addEventListener('pause', () => {
            setAState("pause")
        })

        if (a?.currentTime >= 0 && a?.paused) {
            console.log("1")
            a.play();
            setAState("play")
            return;
        }

        if (a?.currentTime > 0 && !a?.paused) {
            console.log("2")
            a.pause();
            setAState("pause")
            return;
        }
    }

    const handleClick = () => {
        setExpand(!expand)
        if (!expand) {
            document.getElementById('playerholder')?.style.setProperty('--player-size', '100%');
            document.getElementById('additionalContent')?.style.setProperty('--add-content-visibility', 'visible');

        }
        else {
            document.getElementById('playerholder')?.style.setProperty('--player-size', '16%');
            document.getElementById('additionalContent')?.style.setProperty('--add-content-visibility', 'hidden');

        }
    }

    const AudioToVideo = () => {
        let audio_ = document.getElementById('audioplayer') as HTMLAudioElement
        let video = document.getElementById('mainVideo') as HTMLVideoElement
        let video_ = document.getElementById('backVideo') as HTMLVideoElement
        document.getElementById('audiocontrols')?.style.setProperty('--pointer', 'no-drop');
        document.getElementById('audiocontrols')?.style.setProperty('--bg-color', 'rgb(27 27 27)');
        const a: HTMLAudioElement = audio_;
        const v: HTMLVideoElement = video;
        const v_: HTMLVideoElement = video_; 
        v.src = audio.location.replace('audio', 'video').replace('mp3', 'mp4')
        v_.src = audio.location.replace('audio', 'video').replace('mp3', 'mp4')
        setVState("play")
        setAState("pause")
        v.currentTime = a.currentTime;
        v_.currentTime = a.currentTime;
        v.play();
        a.pause();
        v_.play()
    }

    const VideoToAudio = () => {
        let audio = document.getElementById('audioplayer') as HTMLAudioElement
        let video = document.getElementById('mainVideo') as HTMLVideoElement
        let video_ = document.getElementById('backVideo') as HTMLVideoElement
        document.getElementById('audiocontrols')?.style.setProperty('--pointer', '');
        document.getElementById('audiocontrols')?.style.setProperty('--bg-color', 'rgb(27 27 27)');
        const a: HTMLAudioElement = audio!;
        const v: HTMLVideoElement = video!;
        const v_: HTMLVideoElement = video_!;
        a.currentTime = v_.currentTime
        a.play();
        v.pause();
        v_.pause();
    }

    const handleLikeClick = async () => {
        dispatch(setLiked(true))
        if (likedsongs.includes(audio._id)) {
            setOp("deletefrom")
            setMethod("delete")
        } else {
            setMethod("post")
            setOp("addto")
        }
        let headersList = {
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "track": audio.name
        });

        let response = await fetch(`http://localhost:5000/api/likedsongs/${op}likedsongs/${user.uid}`, {
            method: method,
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        // setLike("solid")
        dispatch(setLiked(false))
    }


    React.useEffect(() => {
        // setLiked(false)
    }, [audio])

    return (
        <div className="playerContainer">
            <div className="playerHolder">
                <div className="albumpic" id="albumpic">
                    {audio && <img src={audio?.img} height="100%" width="100%" alt="" />}
                </div>
                <div className="audiodetails">
                    <div className="musicnameholder">
                        <div className="musicnameaudio">
                            {audio?.name}
                        </div>
                    </div>
                    <div className="artistsholder">
                        {audio?.artist.join(",")}

                    </div>
                </div>
                <div className="audiocontrols" id="audiocontrols">
                    <div className="audiocontrolsholder">
                        <div className="audiocontrolsmenu">
                            <i className="fa-solid fa-backward"></i>
                            <i className={`fa-solid fa-${aState === "pause" ? "play" : "pause"}`} onClick={() => {
                                console.log("object")
                                toggleAudioState()
                            }}></i>
                            <i className="fa-solid fa-forward"></i>
                            <i className={`fa-solid fa-${expand ? "caret-down" : "caret-up"}`} onClick={() => {
                                handleClick()
                            }}
                            ></i>
                            <i className={`fa-heart fa-${likedsongs.includes(audio?.id) ? "solid" : "regular"}`} onClick={() => {
                                setLiked_(true)
                                handleLikedClick()
                            }} ></i>
                        </div>
                    </div>
                    <div className="audioprogressbarholder">
                        <div className="audioprogressbar">
                            <div className="audioprogressindicator" id="audprogindicator">

                            </div>
                            <audio src="" loop preload="auto" id="audioplayer" controls={false}></audio>
                        </div>
                    </div>
                </div>
            </div>
            <div className="additionalContent" id="additionalContent">
                <div className="additionalContentOptionHolder">
                    <div className={`additionalContentOptions ${request === "audio" ? "addContentOptionActive" : ""}`} onClick={() => {
                        setRequest("audio")
                        VideoToAudio()
                    }}>Audio</div>
                    <div className={`additionalContentOptions ${request === "video" ? "addContentOptionActive" : ""}`} onClick={() => {
                        setRequest("video")
                        AudioToVideo()
                    }}>Video</div>
                    <div className={`additionalContentOptions ${request === "lyrics" ? "addContentOptionActive" : ""}`} onClick={() => {
                        setRequest("lyrics")
                    }}>Lyrics</div>
                    <div className={`additionalContentOptions ${request === "queue" ? "addContentOptionActive" : ""}`} onClick={() => {
                        setRequest("queue")
                    }}>Queue</div>
                </div>
                <div className="additionalContentHolder">
                    <div className={request === "audio" ? "active audioContentHolder" : " inactive"}>
                        <div className="audiocontentalbumpic">
                            <img src={audio?.img} height="100%" width="100%" alt="" />
                        </div>



                    </div>
                    <div className={request === "video" ? "active videoContentHolder" : " inactive"}> <Video></Video> </div>
                    <div className={request === "lyrics" ? "active lyricsContentHolder" : "inactive"}>
                        <div className={`lyriclineholder ${(audioProgress >= 0 && audioProgress < 10) ? "lyriclineactive" : "lyriclineinactive"}`} id="15">Line 1</div>
                        <div className={`lyriclineholder ${(audioProgress >= 10 && audioProgress < 15) ? "lyriclineactive" : "lyriclineinactive"}`} id="20">line2</div>
                        <div className={`lyriclineholder ${(audioProgress >= 15 && audioProgress < 20) ? "lyriclineactive" : "lyriclineinactive"}`} id="">line3</div>
                        <div className={`lyriclineholder ${(audioProgress >= 20 && audioProgress < 40) ? "lyriclineactive" : "lyriclineinactive"}`} id="">line4</div>


                    </div>
                    <div className={request === "queue" ? "active queueContentHolder" : "inactive"}> Queue </div>
                </div>
            </div>

        </div>
    )
}

export default Player
