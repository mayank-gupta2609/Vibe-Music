import React, { useRef, useState } from 'react'
import './Player.css'
import Video from '../Video/Video'
import { useSelector, useDispatch } from "react-redux";
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { setAudio, setLiked, setLikedsongs, setLikesList, setSong, setSongIndex } from '../../../redux/features/userSlice';

const Player = () => {

    const { audio, likedsongs, songIndex, tracklist, songslist } = useSelector((state: any) => state.user)
    const { user, likeslist } = useSelector((state: any) => state.user)

    const [request, setRequest] = useState<string>("audio")
    const [aState, setAState] = useState<string>("pause")
    const [audioProgress, setAudioProgress] = useState<number>(0)
    const [expand, setExpand] = useState<boolean>(false)
    const [vState, setVState] = useState<string>("pause")
    const [liked, setLiked_] = useState<boolean>(false)
    const dispatch = useDispatch()
    // const [op, setOp] = useState("addto")
    // const [method, setMethod] = useState("post")
    const operation = useRef("addto")
    const method = useRef("post")
    const userlike = useRef(false)
    const indexRef = useRef(songIndex)
    const lyrics = [[10.16, 13.12, ' Record scratch, Steve Miller band\n'], [13.12, 16.11, ' Tattooed necks and tattooed hands\n'], [16.11, 22.88, " Oh, how don't you drown in a rain storm?\n"], [22.88, 25.85, ' Fresh regrets, vodka sweats\n'], [25.85, 36.12, " The sun is down and we're bound to get exhausted and so far from the shore\n"], [36.12, 37.37, " You're never gonna get it\n"], [37.37, 39.36, " I'm a hazard to myself\n"], [39.36, 40.62, " I'll break it to you easy\n"], [40.62, 42.36, ' This is hell, this is hell\n'], [42.36, 45.63, " You're looking and whispering you think I'm someone else\n"], [45.63, 47.12, ' This is hell, yes\n'], [47.12, 48.62, ' Literal hell\n'], [48.62, 49.86, " We don't have to talk\n"], [49.86, 51.63, " We don't have to dance\n"], [51.63, 53.14, " We don't have to smile\n"], [53.14, 54.9, " We don't have to make friends\n"], [54.9, 56.38, " It's so nice to meet you\n"], [56.38, 58.36, " Let's never meet again\n"], [58.36, 59.87, " We don't have to talk\n"], [59.87, 61.62, " We don't have to dance\n"], [61.62, 65.6, " We don't have to dance\n"], [65.6, 68.87, ' Bottles smashed, I raised my hand\n'], [68.87, 72.12, ' How can you all even stand?\n'], [72.12, 78.89, ' And why is there joy in this poison? Oh\n'], [78.89, 81.87, ' Faking smiles and confidence\n'], [81.87, 86.12, ' Driving miles to capture this excitement\n'], [86.12, 92.1, " I can't take anymore\n"], [92.1, 93.36, " You're never gonna get it\n"], [93.36, 95.13, " I'm a hazard to myself\n"], [95.13, 96.62, " I'll break it to you easy\n"], [96.62, 98.37, ' This is hell, this is hell\n'], [98.37, 100.12, " You're looking and whispering\n"], [100.12, 101.62, " You think I'm someone else\n"], [101.62, 102.9, ' This is hell, yes\n'], [102.9, 104.37, ' I am in hell\n'], [104.37, 105.88, " We don't have to talk\n"], [105.88, 107.37, " We don't have to dance\n"], [107.37, 108.87, " We don't have to smile\n"], [108.87, 110.62, " We don't have to make friends\n"], [110.62, 112.13, " It's so nice to meet you\n"], [112.13, 113.87, " Let's never meet again\n"], [113.87, 115.63, " We don't have to talk\n"], [115.63, 117.37, " We don't have to dance\n"], [117.37, 121.12, " We don't have to dance\n"], [121.12, 122.12, ' Yeah, yeah\n'], [122.12, 134.62, ' Yeah, yeah\n'], [134.62, 136.12, " You're never gonna get it\n"], [136.12, 137.88, " I'm a hazard to myself\n"], [137.88, 139.36, " I'll break it to you easy\n"], [139.36, 141.11, ' This is hell, this is hell\n'], [141.11, 142.88, " You're looking and whispering\n"], [142.88, 144.12, " You think I'm someone else\n"], [144.12, 145.65, ' This is hell, yes\n'], [145.65, 148.87, ' Literal hell\n'], [148.87, 150.36, " We don't have to talk\n"], [150.36, 151.87, " We don't have to dance\n"], [151.87, 153.37, " We don't have to smile\n"], [153.37, 155.11, " We don't have to make friends\n"], [155.11, 156.62, " It's so nice to meet you\n"], [156.62, 158.37, " Let's never meet again\n"], [158.37, 160.13, " We don't have to talk\n"], [160.13, 161.89, " We don't have to dance\n"], [161.89, 165.37, " We don't have to dance\n"], [165.37, 167.12, " We don't have to talk\n"], [167.12, 168.37, " We don't have to talk\n"], [168.37, 172.12, " We don't have to dance\n"], [172.12, 173.63, " We don't have to talk\n"], [173.63, 175.15, ' Talk, talk\n'], [175.15, 181.86, " We don't have to dance\n"], [181.86, 183.62, " We don't have to talk\n"], [183.62, 186.62, ' Talk, talk, talk, talk\n'], [186.62, 187.62, ' Talk, talk, talk, talk']]
    // const { audio } = useSelector((state:any) => state.user)
    // const [like, setLike] = useState<any[]>([])
    // const [likedSongsList, setLikedSongsList] = useState<any[]>([]);
    // console.log(likedsongs)
    // console.log(likeslist)
    // const handleLikedClick = async () => {
    //     // const likedRef = doc(db, "Likes", user.username);

    //     // console.log(liked)
    //     // if (liked) {
    //     //     console.log(audio.name)
    //     //     await updateDoc(likedRef, {
    //     //         likes: arrayUnion(...[audio.id])
    //     //     });
    //     // } else {
    //     //     await updateDoc(likedRef, {
    //     //         likes: arrayRemove(audio.name)
    //     //     });
    //     // }
    // }

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
        console.log(data)
        // setUserlike((prevstate:any) => data)
        userlike.current = data
        console.log(userlike);

    }


    const handleLikedClick = async () => {
        console.log(likedsongs)
        try {
            if (userlike.current === true) {
                // console.log("object")
                // setOp("deletefrom")
                // setMethod("delete")
                operation.current = "deletefrom"
                method.current = "delete"
                console.log("dele")
                // setLiked_(false)
                // newlist = likedsongs.filter((item: any) => item != audio._id)

            } else {

                // setMethod("post")
                // setOp("addto")
                operation.current = "addto"
                method.current = "post"
                console.log("add")
                // dispatch(setLikedsongs([...likedsongs.filter((item: any) => item != audio._id), audio.id]))
                // dispatch(setLikesList([...likeslist.filter((item: any) => item.id != audio._id), audio]))
                // newlist = newlist.concat(audio?._id)
            }

            let headersList = {
                "Content-Type": "application/json"
            }

            console.log(audio)
            let bodyContent = JSON.stringify({
                "_id": audio?._id,
                "userid": user.uid
            });

            console.log(user)
            let response = await fetch(`http://localhost:5000/api/likedsongs/${operation.current}likedsongs/${user?.uid}`, {
                method: method.current,
                body: bodyContent,
                headers: headersList
            });

            let data = await response.json();
            console.log(data);

            if (data.success) {
                userlike.current = !userlike.current;
                console.log("object")
                console.log(userlike)
                if (userlike.current) {
                    console.log("1")
                    const newlist = [...likedsongs, audio?._id]
                    const songlist = [...likeslist, audio]
                    console.log(newlist);
                    // setUserlike(false)
                    dispatch(setLikedsongs(newlist));
                    dispatch(setLikesList(songlist));
                    console.log(likedsongs);
                    // dispatch(setLikedsongs((prevState: any) => prevState.concat(audio?._id)));
                }
                else {
                    console.log("2")
                    const newlist = likedsongs.filter((item: any) => item != audio?._id)
                    const songlist = likeslist.filter((item: any) => item._id != audio?._id)
                    console.log(newlist);
                    dispatch(setLikedsongs(newlist));
                    dispatch(setLikesList(songlist));
                    console.log(likedsongs);
                    // setUserlike(true)
                    // dispatch(setLikedsongs(newlist));
                }
            }
            setLiked_(false)
            // setLike("solid")
            // dispatch(setLiked(false))
            // setLike(like => [...like, audio.id])
            // console.log(like)
            // dispatch(setLikesList(data.songs))
            // likedsongs.push(audio._id)
            // setLikedSongsList(likedsongs)
        } catch (error) {
            console.log(error)
        }
        // console.log(likedsongs)
        // console.log(likeslist)
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
        console.log(data);
    }

    // const handleLikeClick = async () => {
    //     dispatch(setLiked(true))
    //     if (likedsongs.includes(audio._id)) {
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
    //         "track": audio.name
    //     });

    //     let response = await fetch(`http://localhost:5000/api/likedsongs/${op}likedsongs/${user.uid}`, {
    //         method: method,
    //         body: bodyContent,
    //         headers: headersList
    //     });

    //     let data = await response.json();
    //     console.log(data);
    //     // setLike("solid")
    //     dispatch(setLiked(false))
    // }

    React.useEffect(() => {
        updateHistory()
    }, [audio])


    React.useEffect(() => {
        // setLiked(false)
        // checkLike()
        let song = document.getElementById('audioplayer') as HTMLAudioElement
        const a: HTMLAudioElement = song!;
        document.title = "Swift Music • " + audio?.name

        if (a?.paused) setAState("play")
        else setAState("pause")

        a?.addEventListener('timeupdate', () => {
            let time = a.currentTime / a.duration
            setAudioProgress(Math.floor(a.currentTime))
            document.getElementById('audprogindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");
            // if (expand === false) {

            document.getElementById('active')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
            // }
        })
        a?.addEventListener('play', () => {
            setAState("play")
        })

        a?.addEventListener('pause', () => {
            setAState("pause")
        })


    }, [])


    // React.useEffect(() => {
    // setLike(likedsongs)

    // handleLikedClick()

    // return () => {
    //     setLiked_(false)
    // }
    // }, [liked])

    React.useEffect(() => {
        // if (likedsongs?.includes(audio?._id) === true) {
        //     setLiked_(true)
        // }
        // console.log(likedsongs?.includes(audio?._id))
        checkLike()
    }, [audio])

    React.useEffect(()=>{
        dispatch(setSongIndex(0))
    }, [])


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
                <div className="audiocontrols" id="audiocontrols" >
                    <div className="audiocontrolsholder">
                        <div className="audiocontrolsmenu">
                            <div style={{
                                pointerEvents: request === "video" ? "none" : "auto"
                            }} className="audiocontrolsmenu">

                                <i className="fa-solid fa-backward"
                                    onClick={() => {
                                        // indexRef.current = indexRef.current - 1
                                        // dispatch(setSongIndex((songIndex-1)))
                                        // dispatch(setAudio(songslist[songIndex]))
                                    }}
                                ></i>
                                <i className={`fa-solid fa-${aState === "pause" ? "play" : "pause"}`} onClick={() => {
                                    console.log("object")
                                    toggleAudioState()
                                }}></i>
                                <i className="fa-solid fa-forward"
                                    onClick={() => {
                                        // console.log(songslist)
                                        // console.log(songIndex)
                                        // indexRef.current = indexRef.current + 1
                                        // dispatch(setSongIndex((songIndex+1)))
                                        // dispatch(setAudio(songslist[songIndex]))
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
                                    setLiked_(true)
                                    handleLikedClick()
                                }} ></i>
                        </div>
                    </div>
                    <audio src={audio ? audio.location : ''} autoPlay loop preload="auto" id="audioplayer" controls={false}></audio>
                    <div className="audioprogressbarholder">
                        <div className="audioprogressbar">
                            <div className="audioprogressindicator" id="audprogindicator">

                            </div>
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
                    <div className={request === "lyrics" ? "active lyricsContentHolder" : "inactive"} id="lyricsholder">
                        {
                            lyrics.map((line: any) => {
                                return <div className={`lyriclineholder ${(audioProgress >= line[0] && line[1] > audioProgress) ? "lyriclineactive" : "lyriclineinactive"}`}
                                    id={`${(audioProgress >= line[0] && line[1] > audioProgress) ? "active" : "inactive"}`}
                                    style={{
                                        color: audioProgress > line[1] ? "#B9FFF8" : ""
                                    }}
                                >{line[2]}</div>
                            })
                        }
                        {/* <div className={`lyriclineholder ${(audioProgress >= 0 && audioProgress < 10) ? "lyriclineactive" : "lyriclineinactive"}`} id="15">Line 1</div>
                        <div className={`lyriclineholder ${(audioProgress >= 10 && audioProgress < 15) ? "lyriclineactive" : "lyriclineinactive"}`} id="20">line2</div>
                        <div className={`lyriclineholder ${(audioProgress >= 15 && audioProgress < 20) ? "lyriclineactive" : "lyriclineinactive"}`} id="">line3</div>
                        <div className={`lyriclineholder ${(audioProgress >= 20 && audioProgress < 40) ? "lyriclineactive" : "lyriclineinactive"}`} id="">line4</div> */}


                    </div>
                    <div className={request === "queue" ? "active queueContentHolder" : "inactive"}>
                        <div className='queuecontents'>

                            {
                                songslist?.map((item: any, index:number) => {
                                    return <div className='queueitem' style={{
                                        opacity:songIndex===index ? "0.5" :"1"
                                    }}>
                                        {/* {index+1} */}
                                        <img src={item.img} alt="" />
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
                            } </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Player
