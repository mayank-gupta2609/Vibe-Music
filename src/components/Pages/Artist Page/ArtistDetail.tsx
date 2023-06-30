import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ArtistDetail = () => {
    const [albums, setalbums] = useState<any>([])
    const [songs, setSongs] = useState<any>([])
    const { id } = useParams()
    const { artist, artistname } = useSelector((state: any) => state.artist)

    //console.log(artistname)
    //console.log(id)

    const getArtistDetails = async () => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let response = await fetch(`http://localhost:5000/api/artists/getartistinfo/${artistname}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        //console.log(data);
        // //console.log(data[0]?.albums) 
        setalbums(data[0]?.albums)
        setSongs(data[0]?.songs)
        //console.log(data?.a); 
    }

    useEffect(() => {

        const add = document.getElementById("additionalTab")
        const div = document.getElementById('artist-detail')
        div?.addEventListener("scroll", () => {
            // //console.log(div.scrollTop)
            let t: number = div.scrollTop / 220
            // //console.log(t)
            document.getElementById("headerholder")?.style.setProperty("--alpha", t.toString())
            document.getElementById("additionalTab")?.style.setProperty("--opacity", t.toString())
            if (add) {
                add.innerHTML = artistname
            }
        })



    }, [])

    useEffect(() => {
        getArtistDetails()
    }, [])

    return (
        <div className="artist-detail" id="artist-detail">
            <div className="topheader">
                <div className="artistnameheader">
                    {artistname}
                </div>
                <img src="https://yt3.googleusercontent.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s900-c-k-c0x00ffffff-no-rj" width="100%" alt="" />


            </div>
            <h1>Albums</h1>
            <div className="holder">
                {albums?.map((album: any) => {
                    return <div className='albumcard'>
                        <img src={album.img} width="100%" alt="" />
                        <div className="albumname">
                            {album.name}
                        </div>
                    </div>
                })}
            </div>

            <h1>Songs</h1>
            <div className="holder">
                {songs?.map((song: any) => {
                    return <div className='albumcard'>
                        <img src={song?.img} width="100%" alt="" />
                        <div className="albumname">
                            {song?.name}
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}

export default ArtistDetail
