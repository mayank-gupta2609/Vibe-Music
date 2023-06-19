import React, { useEffect, useState } from 'react'
import './Search.css'
import SongCard from '../../Shared/SongCard/SongCard'

const Search = () => {
  const [songs, setSongs] = useState<any>([{}, {}, {}, {}, {}, {}, {}, {}])
  return (
    <div className="searchpageholder">
      <div className="row">
        <h1>Trending</h1>
        <h4>See More</h4>
      </div>
      <div className="holder">
        {songs.map((song: any) => {
          return <SongCard song={song}></SongCard>
        })}
      </div>
      <div className="row">
        <h1>Explore by Artist</h1>
        <h4>See More</h4>
      </div>
      <div className="artistholderdiv">
        <div className="artistcard"></div>
        <div className="artistcard"></div>
        <div className="artistcard"></div>
        <div className="artistcard"></div>
      </div>

      <h1> Explore by genre</h1>
      <div className="holder">
          hi
      </div>
    </div>
  )
}

export default Search
