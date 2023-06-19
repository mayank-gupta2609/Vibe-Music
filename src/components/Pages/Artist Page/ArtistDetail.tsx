import React, { useState, useEffect } from 'react'

const ArtistDetail = () => {
    const [albums, setalbums] = useState<any>([{}, {}])



    useEffect(() => {

        const div = document.getElementById('artist-detail')
        // const add = document.getElementById("additionalTab")
        div?.addEventListener("scroll", () => {
            // console.log(div.scrollTop)
            let t: number = div.scrollTop / 220
            console.log(t)
            document.getElementById("headerholder")?.style.setProperty("--alpha", t.toString())
            document.getElementById("additionalTab")?.style.setProperty("--opacity", t.toString())
        })



    }, [])


    return (
        <div className="artist-detail" id="artist-detail">
            <div className="topheader">
                <div className="artistnameheader">
                    Artist Name
                </div>
                <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" width="100%" alt="" />


            </div>
            <h1>Albums</h1>
            <div className="holder">
                {albums.map((album: any) => {
                    return <div className='albumcard'>
                        <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" width="100%" alt="" />
                        <div className="albumname">
                            Trench
                        </div>
                    </div>
                })}
            </div>

            <h1>Songs</h1>
            <div className="holder">
                {albums.map((album: any) => {
                    return <div className='albumcard'>
                        <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" width="100%" alt="" />
                        <div className="albumname">
                            Trench
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}

export default ArtistDetail
