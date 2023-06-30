import React, { useEffect, useState } from 'react'
import './Search.css'
import SongCard from '../../Shared/SongCard/SongCard'
import { useDispatch, useSelector } from 'react-redux'
import { setAudio } from '../../../redux/features/userSlice'

const Search = () => {
  const [songs, setSongs] = useState<any>([])
  const [artists, setArtists] = useState<any>([])
  const [searchterm, setSearchterm] = useState<string>('')
  const { user, audio, searchedterm, songslist } = useSelector((state: any) => state.user)
  const [data, setData] = useState<any>([])
  const dispatch = useDispatch()
  //console.log(searchedterm)

  const getArtists = async () => {

    let headersList = {
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGUwNzNkN2E2MjA0MTU5MDdiZjkxIn0sImlhdCI6MTY3NTc1Njg5MH0.1f0DsE9_vAW8pxlHx0sWhud0YZed3IRXf_wskgMpuE4",
      "Content-Type": "application/json"
    }


    let response = await fetch("http://localhost:5000/api/artists/getartists/", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json()
    //console.log(data)
    setArtists(data)

  }

  const fetchSearchResults = async () => {
    let headersList = {
      "auth-token": localStorage.getItem("auth-token")!,
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "name": searchedterm,
    });

    let response = await fetch("http://localhost:5000/api/songs/searchsong/", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    setData(data)
    // dispatch(setSearcheditems(data))
    //console.log(data);
  }

  useEffect(() => {
    if (searchedterm !== "") {
      fetchSearchResults()
    }


  }, [searchedterm])

  useEffect(() => {
    getArtists()
  }, [])

  return (
    <div className="searchpageholder">
      {searchedterm !== "" && <div>

        <h1>
          Search results for : {searchedterm}
        </h1>

        <div className="searhcSongHolder">
          {data?.map((song: any) => {
            return <div className="searchsongcard" onClick={() => {
              dispatch(setAudio(song))
            }}>
              <div className="artistdetailholder">

                <div className="artistcontentimg">
                  <img src={song?.img} alt="" width="100%" />
                </div>
                <div className="searchsongnameholder">
                  {song?.name}
                </div>
                <div className="searchsongartistholder">
                  {song?.artist.join(",")}
                </div>

              </div>
            </div>
          })}
        </div>

      </div>
      }
      {searchedterm === "" &&

        <div>
          <div className="row">
            <h1>Trending</h1>
            {/* <h4>See More</h4> */}
          </div>
          <div className="holder">
            {songslist?.map((song: any, index: number) => {
              return <SongCard song={song} index={index} onClick={() => {

              }}></SongCard>
            })}
          </div>
          <div className="row">
            <h1>Explore by Artist</h1>
            {/* <h4>See More</h4> */}
          </div>
          <div className="artistholderdiv">
            {artists?.map((artist: any) => {
              return <div className="artistcard">
                <div className="artistdetailholder">

                  <div className="artistcontentimg">
                    <img src={artist?.avatar} alt="" height="100%" width="100%" />
                  </div>
                  <div className="artistcontentname">
                    {artist?.name}
                  </div>
                </div>
              </div>
            })}
          </div>

          <h1> Explore by genre</h1>
          <div className="holder">
            
          </div>

        </div>

      }
    </div>
  )
}

export default Search
