import React, { useRef, useState } from 'react'
import './Player.css'
import Video from '../Video/Video'
import { useSelector, useDispatch } from "react-redux";
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { setAudio, setLiked, setLikedsongs, setLikesList, setSong, setSongIndex } from '../../../redux/features/userSlice';
import { useLocation } from 'react-router';

const Player = () => {

    const { audio, likedsongs, songIndex, songslist } = useSelector((state: any) => state.user)
    const { user, likeslist } = useSelector((state: any) => state.user)
    const location = useLocation();
    const [request, setRequest] = useState<string>("audio")
    const [medState, setMedState] = useState<string>("pause")
    const [audioProgress, setAudioProgress] = useState<number>(0)
    const [expand, setExpand] = useState<boolean>(false)
    const dispatch = useDispatch()
    const [mediaDuration, setMediaDuration] = useState<string>("0:00")
    const [mediaProgress, setmediaProgress_] = useState<string>("0:00")
    const operation = useRef("addto")
    const method = useRef("post")
    const userlike = useRef(false)
    // const indexRef = useRef(songIndex)
    const [lyrics, setLyrics] = useState<[string]>()
    let audio1 = document.getElementById('audioplayer') as HTMLAudioElement
    const a: HTMLAudioElement = audio1!;
    let video = document.getElementById('mainVideo') as HTMLVideoElement
    const v: HTMLVideoElement = video;

    const checkLike = async () => {
        let headersList = {
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "uid": user?.uid
        });

        let response = await fetch(`http://localhost:5000/api/likedsongs/checklike/${audio?._id}`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        //console.log(data)
        // setUserlike((prevstate:any) => data)
        userlike.current = data
        //console.log(userlike);

    }


    const handleLikedClick = async () => {
        //console.log(likedsongs)
        try {
            if (userlike.current === true) {
                operation.current = "deletefrom"
                method.current = "delete"

            } else {
                operation.current = "addto"
                method.current = "post"
            }

            let headersList = {
                "Content-Type": "application/json"
            }

            //console.log(audio)
            let bodyContent = JSON.stringify({
                "_id": audio?._id,
                "userid": user.uid
            });

            //console.log(user)
            let response = await fetch(`http://localhost:5000/api/likedsongs/${operation.current}likedsongs/${user?.uid}`, {
                method: method.current,
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();
            //console.log(data);

            if (data.success) {
                userlike.current = !userlike.current;
                if (userlike.current) {
                    //console.log("1")
                    const newlist = [...likedsongs, audio?._id]
                    const songlist = [...likeslist, audio]
                    dispatch(setLikedsongs(newlist));
                    dispatch(setLikesList(songlist));
                }
                else {
                    //console.log("2")
                    const newlist = likedsongs.filter((item: any) => item != audio?._id)
                    const songlist = likeslist.filter((item: any) => item._id != audio?._id)
                    //console.log(newlist);
                    dispatch(setLikedsongs(newlist));
                    dispatch(setLikesList(songlist));
                }
            }
            // setLiked_(false)
        } catch (error) {
            //console.log(error)
        }
        // //console.log(likedsongs)
        // //console.log(likeslist)
    }

    const toggleMediaState = () => {
        if (request === "audio" || request === "lyrics" || request === "queue") {
            if (a?.currentTime >= 0 && a?.paused) {
                a.play();
                setMedState("play")
                return;
            }

            if (a?.currentTime > 0 && !a?.paused) {
                a.pause();
                setMedState("pause")
                return;
            }
        }

        if (request === "video") {
            if (v?.currentTime >= 0 && v?.paused) {
                v.play();
                setMedState("play")
                return;
            }

            if (v?.currentTime > 0 && !v?.paused) {
                //console.log("2")
                v.pause();
                setMedState("pause")
                return;
            }
        }

        // if(request === "lyrics"){

        // }


    }

    const handleClick = () => {
        setExpand(!expand)
        if (!expand) {
            document.getElementById('playerholder')?.style.setProperty('--player-size', '100%');
            document.getElementById('additionalContent')?.style.setProperty('--add-content-opacity', '1');

        }
        else {
            document.getElementById('playerholder')?.style.setProperty('--player-size', '16%');
            document.getElementById('additionalContent')?.style.setProperty('--add-content-opacity', '0');

        }
    }

    const AudioToVideo = () => {
        if (request === "audio") {
            // let audio1_ = document.getElementById('audioplayer') as HTMLAudioElement
            // const v: HTMLVideoElement = video;
            // const a: HTMLAudioElement = audio1_;
            v.src = audio?.location.replace('audio', 'video').replace('mp3', 'mp4')
            // setVState("play")
            // setMedState("pause")
            setMedState("play")
            v.currentTime = a.currentTime;
            v.play();
            a.pause();
            setRequest("video")
        }

        if (request === "lyrics" || request === "queue") {
            setRequest("video")
            a.pause();
            v.currentTime = a.currentTime
            v.play()
        }

    }

    const VideoToAudio = () => {
        if (request === "video") {
            let audio1 = document.getElementById('audioplayer') as HTMLAudioElement
            const a: HTMLAudioElement = audio1!;
            const v: HTMLVideoElement = video!;
            // const v_: HTMLVideoElement = video_!;
            v?.pause();
            a.currentTime = v.currentTime
            a.play();
            setMedState("play")
            setRequest("audio")
        }

        if (request === "lyrics" || request === "queue") {
            setRequest("audio")
        }
    }

    const updateHistory = async () => {
        let headersList = {
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "track": audio?.name,
        });

        let response = await fetch(`http://localhost:5000/api/history/updatehistory/${user?.uid}`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        //console.log(data);
    }

    // const handleLikeClick = async () => {
    //     dispatch(setLiked(true))
    //     if (likedsongs.includes(audio?._id)) {
    //         setOp("deletefrom")
    //         setMethod("delete")
    //     } else {
    //         setMethod("post")
    //         setOp("addto")
    //     }
    //     let headersList = {
    //         "Content-Type": "application/json"
    //     }

    //     let bodyContent = JSON.stringify({
    //         "track": audio?.name
    //     });

    //     let response = await fetch(`http://localhost:5000/api/likedsongs/${op}likedsongs/${user.uid}`, {
    //         method: method,
    //         body: bodyContent,
    //         headers: headersList
    //     });

    //     let data = await response.json();
    //     //console.log(data);
    //     // setLike("solid")
    //     dispatch(setLiked(false))
    // }

    const getSongLyrics = async () => {
        let headersList = {
            "Content-Type": "application/json"
        }

        let response = await fetch(`http://localhost:5000/api/songs/getsonglyrics/${audio?.name}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        setLyrics(data?.lyricContent)
        //console.log(data);

    }

    const changeDuration = (e: any) => {
        const audioprog = document.getElementById('audioprogressbar')!
        let x = audioprog?.getClientRects()!
        let time = (Math.abs(e.clientX - x[0].left) / audioprog?.clientWidth)

        if (request === "audio" || request === "lyrics" || request === "queue") {
            a.currentTime = a.duration * time
            document.getElementById('mediaProgressindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");
        } else if (request === "video") {
            let video_ = document.getElementById('mainVideo') as HTMLVideoElement
            const v: HTMLAudioElement = video_!;
            v.currentTime = v.duration * time
            document.getElementById('mediaProgressindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");
        }
    }

    React.useEffect(() => {

        if (v) {
            v.src = audio?.location.replace('audio', 'video').replace('mp3', 'mp4')
        }
        if (request === "video") {

            v.play()
            a.pause()
            a.currentTime = 0
        }

        if (audio) {
            updateHistory()
        }
    }, [audio])


    React.useEffect(() => {
        if (audio) {

            if (a) {
                a?.addEventListener('loadeddata', () => {

                    setMediaDuration(Math.floor(a?.duration / 60) + ':' + ('0' + Math.floor(a?.duration % 60)).slice(-2))

                })
                // setMediaDuration(Math.floor(a?.duration / 60) + ':' + ('0' + Math.floor(a?.duration % 60)).slice(-2))
            } else {
                setMediaDuration("0:00")
            }

            if (a?.paused) setMedState("play")
            else setMedState("pause")

            // if (a) {

            a?.addEventListener("ended", () => {
                if (songIndex < songslist.length - 1) {
                    dispatch(setSongIndex((songIndex + 1)))
                    dispatch(setAudio(songslist[songIndex + 1]))
                }
// <<<<<<< HEAD


// =======
// >>>>>>> d314aa59d6cb745f081bb505dc9ab05d59e7c835
            });

            // v?.addEventListener("ended", () => {
            //     if (songIndex < songslist.length - 1) {
            //         dispatch(setSongIndex((songIndex + 1)))
            //         dispatch(setAudio(songslist[songIndex + 1]))
            //     }
            // });

            a?.addEventListener('timeupdate', () => {
                let time = a.currentTime / a.duration
                setAudioProgress(Math.floor(a.currentTime))
                document.getElementById('mediaProgressindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");
                setmediaProgress_(Math.floor(a.currentTime / 60) + ':' + ('0' + Math.floor(a.currentTime % 60)).slice(-2))
                // if (expand === false) {
                // //console.log(Math.floor(a.currentTime / 60) + ':' + ('0' + Math.floor(a.currentTime % 60)).slice(-2))
                document.getElementById('active')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
                // }
            })

            v?.addEventListener('timeupdate', () => {
                let time = v.currentTime / v.duration
                setAudioProgress(Math.floor(v.currentTime))
                document.getElementById('mediaProgressindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");
                setmediaProgress_(Math.floor(v.currentTime / 60) + ':' + ('0' + Math.floor(v.currentTime % 60)).slice(-2))


            })

            a?.addEventListener('play', () => {
                setMedState("play")
            })

            a?.addEventListener('pause', () => {
                setMedState("pause")
            })

            v?.addEventListener('play', () => {
                setMedState("play")
            })

            v?.addEventListener('pause', () => {
                setMedState("pause")
            })

            // }

        }
        let url = " url(" + audio?.img + ")"
        document.getElementById("audioContentContainer")?.style.setProperty("--background-image-url", url)
        document.getElementById("lyricContentContainer")?.style.setProperty("--background-image-url", url)
        document.getElementById("queuebackground")?.style.setProperty("--background-image-url", url)
        if (audio) {
            getSongLyrics()
            checkLike()
        }
    }, [audio])

    React.useEffect(() => {
        if (request === "video") {
            v?.addEventListener("loadeddata", () => {
                setMediaDuration(Math.floor(v?.duration / 60) + ':' + ('0' + Math.floor(v?.duration % 60)).slice(-2))
            })

            // v?.addEventListener("ended", () => {
            //     if (songIndex < songslist.length - 1) {
            //         dispatch(setSongIndex((songIndex + 1)))
            //         dispatch(setAudio(songslist[songIndex + 1]))
            //     }
            //     a?.pause();
            //     v?.play()
            // });


        }

        if (request === "audio") {
            // a?.addEventListener("loadeddata", () => {
            setMediaDuration(Math.floor(a?.duration / 60) + ':' + ('0' + Math.floor(a?.duration % 60)).slice(-2))
            a?.addEventListener("ended", () => {
                if (songIndex < songslist.length - 1) {
                    dispatch(setSongIndex((songIndex + 1)))
                    dispatch(setAudio(songslist[songIndex + 1]))
                }
            });

            // v?.pause();
            // })
        }

    }, [request])

    React.useEffect(() => {
        setMediaDuration("0:00")
        dispatch(setSongIndex(0))
    }, [])

    React.useEffect(() => {
        if (expand) {
            setExpand(false)
            document.getElementById('playerholder')?.style.setProperty('--player-size', '16%');
            document.getElementById('additionalContent')?.style.setProperty('--add-content-opacity', '0');
        }
    }, [location])


    return (
        <div className="playerContainer">
            <div className="playerHolder">
                {!expand && <div className="albumpic" id="albumpic">
                    {audio && <img src={audio?.img} height="100%" width="100%" alt="" />}
                </div>}
                <div className="audiodetails">
                    <div className="musicnameholder">
                        <div className="musicnameaudio">
                            {audio?.name}
                        </div>
                    </div>
                    <div className="auddetailrtistsholder">
                        {audio?.artist.join(",")}
                    </div>
                </div>
                <div className="audiocontrols" id="audiocontrols" >
                    <div className="audiocontrolsholder">
                        <div className="audiocontrolsmenu">
                            <div className="audiocontrolsmenu">

                                <i className="fa-solid fa-backward"
                                    onClick={() => {
                                        // indexRef.current = indexRef.current - 1
                                        if (songIndex > 0) {

                                            dispatch(setSongIndex((songIndex - 1)))
                                            dispatch(setAudio(songslist[songIndex - 1]))
                                        }
                                    }}
                                ></i>
                                <i className={`fa-solid fa-${medState === "pause" ? "play" : "pause"}`} onClick={() => {
                                    //console.log("object")
                                    toggleMediaState()
                                }}></i>
                                <i className="fa-solid fa-forward"
                                    onClick={() => {
                                        if (songIndex < songslist.length - 1) {
                                            dispatch(setSongIndex((songIndex + 1)))
                                            dispatch(setAudio(songslist[songIndex + 1]))
                                        }
                                    }}
                                ></i>
                            </div>
                            <i className={`fa-solid fa-${expand ? "caret-down" : "caret-up"}`} onClick={() => {
                                handleClick()
                            }}
                            ></i>
                            <i className=
                                {`fa-heart fa-${userlike.current ? "solid" : "regular"}`}
                                // "fa-heart fa-solid"
                                onClick={() => {
                                    // setLiked_(true)
                                    handleLikedClick()
                                }} ></i>
                        </div>
                    </div>
                    <audio src={audio ? audio?.location : ''} autoPlay 
                    // ={request !== "video"} 
                    loop={false} preload="metadata" id="audioplayer" controls={false}></audio>
                    <div className="audioprogressbarholder">
                        {mediaProgress}
                        <div className="audioprogressbar" id="audioprogressbar" onClick={(e: any) => {
                            changeDuration(e)
                        }}>

                            <div className="audioprogressindicator" id="mediaProgressindicator">
                            </div>

                        </div>
                        {mediaDuration}
                    </div>
                </div>
            </div>
            <div className="additionalContent" id="additionalContent">
                <div className="additionalContentOptionHolder">
                    <div className={`additionalContentOptions ${request === "audio" ? "addContentOptionActive" : ""}`} onClick={() => {
                        VideoToAudio()
                    }}><i className="fa-solid fa-music"></i></div>
                    <div className={`additionalContentOptions ${request === "video" ? "addContentOptionActive" : ""}`} onClick={() => {
                        AudioToVideo()
                    }}><i className="fa-solid fa-video"></i></div>
                    <div className={`additionalContentOptions ${request === "lyrics" ? "addContentOptionActive" : ""}`} onClick={() => {
                        if (request == "video") {
                            //                          
                            v?.pause()
                            a.currentTime = v?.currentTime
                            a?.play()
                            // 
                            // 
                        }
                        setRequest("lyrics")
                        // if(v.)
                    }}><i className="fa-solid fa-align-center fa-rotate-90"></i></div>
                    <div className={`additionalContentOptions ${request === "queue" ? "addContentOptionActive" : ""}`} onClick={() => {
                        setRequest("queue")
                    }}><i className="fa-solid fa-bars-staggered"></i></div>
                </div>
                <div className="additionalContentHolder">
                    <div className={request === "audio" ? "active audioContentHolder" : " inactive"}>
                        <div className="audioContentContainer" id="audioContentContainer">

                        </div>
                        <div className="audiocontentalbumpic">
                            <img src={audio?.img} height="100%" width="100%" alt="" />
                        </div>




                    </div>
                    <div className={request === "video" ? "active videoContentHolder" : " inactive"}> <Video></Video> </div>
                    <div className={request === "lyrics" ? "active lyricsContentHolder" : "inactive"} id="lyricsholder">
                        <div className="lyricContentContainer" id="lyricContentContainer">

                        </div>
                        <div className="lyricsline">

                            {
                                lyrics?.map((line: any, index: number) => {
                                    return <div className={`lyriclineholder ${(audioProgress >= line[0] && line[1] > audioProgress) ? "lyriclineactive" : "lyriclineinactive"}`}
                                        id={`${(audioProgress >= line[0] && line[1] > audioProgress) ? "active" : "inactive"}`}
                                        style={{
                                            color: audioProgress > line[1] ? "#B9FFF8" : ""
                                        }

                                        }

                                        key={index}

                                    // onClick={() => {
                                    //     let audio1 = document.getElementById('audioplayer') as HTMLAudioElement
                                    //     const a: HTMLAudioElement = song!;
                                    //     a.currentTime = line[0]
                                    // }}

                                    >{line[2]}</div>
                                })
                            }
                        </div>


                    </div>
                    <div className={request === "queue" ? "active queueContentHolder" : "inactive"}>
                        {/* <div className='queuecontents'> */}
                        <div className="queuebackground" id="queuebackground">

                        </div>

                        <div className="queuecontents">

                            {
                                songslist?.map((item: any, index: number) => {
                                    return <div className='queueitem' style={{
                                        opacity: songIndex === index ? "0.5" : "1"
                                    }} key={item._id} onClick={() => {
                                        dispatch(setAudio(item))
                                        dispatch(setSongIndex(index))
                                    }}>
                                        <img src={item.img} alt="" height="80%" />
                                        <div className="queueitemdetials">

                                            <div className="queueitemname">
                                                {item.name}
                                            </div>
                                            <div className="queueitemartist">
                                                {item.artist.join(",")}
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Player
