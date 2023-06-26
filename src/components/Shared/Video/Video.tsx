import React, { useState } from 'react'
import './Video.css'

const Video = () => {
    const [vState, setVState] = useState<string>("play")
    let video_ = document.getElementById('mainVideo') as HTMLVideoElement
    const v: HTMLAudioElement = video_!;


    v?.addEventListener('timeupdate', () => {
        let time = v.currentTime / v.duration
        const minutes = Math.floor(v.currentTime / 60);
        const seconds = v.currentTime - minutes * 60;
        document.getElementById('vidprogindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");
        // console.log("object")
        // setM(minutes)
        // setS(((seconds % 60).toPrecision(2)))
        // setVidProgress(time)
    })

    v?.addEventListener('play', ()=>{
        setVState("play")
    })

    v?.addEventListener('pause', ()=>{
        setVState("pause")
    }) 

    const vidprogholder = document.getElementById("videoprogressbarholder")
    vidprogholder?.addEventListener('click', (e)=>{
        // console.log(e.offsetX / document.getElementById("videoprogressbarholder")?.offsetWidth)
    })

    const changeVidProgress = (e:React.MouseEvent<Element, MouseEvent>) => {
        // console.log(e.clientX)
        // console.log(?.offsetLeft)
        // DOMRect
        // document.getElementById('vidprogindicator')?.style.setProperty('--progress-width', '')
    }

    const toggleVideoState = () => {
        // console.log("object")
        let video = document.getElementById('mainVideo') as HTMLVideoElement
        let video_ = document.getElementById('backVideo') as HTMLVideoElement
        const v: HTMLVideoElement = video!;
        const v_: HTMLVideoElement = video_!;
       
        

        if(v.currentTime >= 0 && v.paused){
            console.log("1")
            v.play();
            v_.play()
            setVState("play")
            return;
        }

        if(v.currentTime > 0 && !v.paused ){
            console.log("2")
            v.pause();
            v_.pause()
            setVState("pause")
            return;
        }

    }

    return (
        <div className="videoContainer">
            <div className="videoHolder">
                <div className="videoControl">
                    <div className="videocontrolsmenu">
                        <div className="videocontrolholder">
                            {/* <i className="fa-solid fa-backward"></i> */}
                            <i className={`fa-solid fa-${vState === "pause" ? "play" : "pause"}`} onClick={()=>toggleVideoState()}></i>
                            {/* <i className="fa-solid fa-forward"></i> */}
                        </div>
                        <div className="videoprogressholder" id="videoprogressholder">
                            <div className="videoprogressbarholder" id="videoprogressbarholder" onClick={(e)=>{
                                    changeVidProgress(e)
                                }}>

                                <div className="videoprogressindicator" id="vidprogindicator" ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainVideo" >
                    <video src="" height="100%" width="100%" id="mainVideo" onContextMenu={(e) => e.preventDefault()}></video>
                </div>
                <div className="backVideo"  >
                    <video src="" id="backVideo" width="140%" height="100%" onContextMenu={(e) => e.preventDefault()} muted></video>
                </div>
            </div>
        </div>
    )
}

export default Video
