import React, { useEffect, useState } from 'react'
import './Video.css'

const Video = () => {
    const [vState, setVState] = useState<string>("play")
    let video_ = document.getElementById('mainVideo') as HTMLVideoElement

    let video1 = document.getElementById('backVideo') as HTMLVideoElement
    const v: HTMLAudioElement = video_!;
    const v_: HTMLVideoElement = video1!;
    const [vidDuration, setvidDuration] = useState<string>("0:00")
    const [vidprog, vidProg_] = useState<string>("0:00")

    v?.addEventListener('timeupdate', () => {
        let time = v.currentTime / v.duration
        const minutes = Math.floor(v.currentTime / 60);
        const seconds = v.currentTime - minutes * 60;
        document.getElementById('vidprogindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");
        // vidProg_(Math.floor(a?.duration / 60) + ':' + ('0' + Math.floor(a?.duration % 60)).slice(-2))
        vidProg_(Math.floor(v.currentTime / 60) + ':' + ('0' + Math.floor(v.currentTime % 60)).slice(-2))
        // console.log("object")
        // setM(minutes)
        // setS(((seconds % 60).toPrecision(2)))
        // setVidProgress(time)
    })

    v?.addEventListener('play', () => {
        setVState("play")
        v.play()
        v_.play()
    })

    v?.addEventListener('pause', () => {
        setVState("pause")
        v.pause()
        v_.pause()
    })

    const vidprogholder = document.getElementById("videoprogressbarholder")
    vidprogholder?.addEventListener('click', (e) => {
        // console.log(e.offsetX / document.getElementById("videoprogressbarholder")?.offsetWidth)
    })

    const changeVidProgress = (e: React.MouseEvent<Element, MouseEvent>) => {
        // console.log(e.clientX)
        // console.log(?.offsetLeft)
        // DOMRect
        // document.getElementById('vidprogindicator')?.style.setProperty('--progress-width', '')

        let video = document.getElementById('videoprogressholder') as HTMLAudioElement
        const v: HTMLAudioElement = video!;

        const vidprog = document.getElementById('videoprogressbarholder')!
        // const vidprogindicator = document.getElementById('vidprogindicator')
        // console.log(vidprog?.offsetLeft)
        // console.log(vidindicator?.clientLeft)
        let x = vidprog?.getClientRects()!
        console.log(x[0].left)
        console.log((Math.abs(e.clientX - x[0].left) / vidprog?.clientWidth) * 100)
        // var percent = e.offsetX / this.offsetWidth;
        let time = (Math.abs(e.clientX - x[0].left) / vidprog?.clientWidth)
        // v.currentTime = v.duration * time
        document.getElementById('vidprogindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");

        let video1 = document.getElementById('mainVideo') as HTMLVideoElement
        let video2 = document.getElementById('backVideo') as HTMLVideoElement
        const v1: HTMLVideoElement = video1!;
        const v2: HTMLVideoElement = video2!;
        v1.currentTime = v1.duration * time
        v2.currentTime = v2.duration * time
    }

    const toggleVideoState = () => {
        // console.log("object")
        let video = document.getElementById('mainVideo') as HTMLVideoElement
        let video_ = document.getElementById('backVideo') as HTMLVideoElement
        const v: HTMLVideoElement = video!;
        const v_: HTMLVideoElement = video_!;



        if (v.currentTime >= 0 && v.paused) {
            console.log("1")
            v.play();
            v_.play()
            setVState("play")
            return;
        }

        if (v.currentTime > 0 && !v.paused) {
            console.log("2")
            v.pause();
            v_.pause()
            setVState("pause")
            return;
        }

    }

    useEffect(() => {
        let video_ = document.getElementById('mainVideo') as HTMLVideoElement
        video_.addEventListener('loadeddata', () => {

            setvidDuration(Math.floor(video_?.duration / 60) + ':' + ('0' + Math.floor(video_?.duration % 60)).slice(-2))
        })
    }, [])

    return (
        <div className="videoContainer">
            <div className="videoHolder">
                <div className="videoControl">
                    <div className="videocontrolsmenu">

                        <div className="videocontrolholder">
                            {/* <i className="fa-solid fa-backward"></i> */}
                            <i className={`fa-solid fa-${vState === "pause" ? "play" : "pause"}`} onClick={() => toggleVideoState()}></i>
                            {/* <i className="fa-solid fa-forward"></i> */}
                        </div>
                        <div className="videoprogressholder" id="videoprogressholder">
                            {vidprog}
                            <div className="videoprogressbarholder" id="videoprogressbarholder" onClick={(e) => {
                                changeVidProgress(e)
                            }}>
                                <div className="videoprogressindicator" id="vidprogindicator" ></div>
                            </div>
                            {vidDuration}
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
