// import React, { useEffect, useState } from 'react'
import { useState } from 'react';
import './Video.css'

const Video = () => { 
    let video_ = document.getElementById('mainVideo') as HTMLVideoElement
    const v: HTMLAudioElement = video_!;
    const [captions, setCaptions] = useState<boolean>(false)
    v?.addEventListener('timeupdate', () => {
        let time = v.currentTime / v.duration 
        document.getElementById('audprogindicator')?.style.setProperty('--progress-width', (time * 100).toString() + "%");

    })

    return (
        <div className="videoContainer">
            {/* <i className="fa-solid fa-closed-captioning captionbutton"></i> */}
            <div className="videoHolder">
                {/* <div className="videoControl">
                <div className="captionsholder">
                    <div className="captionline">

                    aldhkajlcd
                    </div>
                </div>
                </div> */}
                <div className="mainVideo" >
                    <video src="" height="100%" width="100%" id="mainVideo" onContextMenu={(e) => e.preventDefault()}></video>
                </div>
                {/* <div className="backVideo"  >
                    <video src="" id="backVideo" width="140%" height="100%" onContextMenu={(e) => e.preventDefault()} muted></video>
                </div> */}
            </div>
        </div>
    )
}

export default Video
