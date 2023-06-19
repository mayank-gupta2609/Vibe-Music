import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    artistname: null,
    artist: null,
    album: null,
    songs: null,
    artistid: null,
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setArtist: (state, action) => {
            state.artist = action.payload
        },
        setAlbum: (state, action) => {
            state.album = action.payload
        },
        setSongs: (state, action) => {
            state.songs = action.payload
        },
        setArtistId: (state, action) => {
            state.artistid = action.payload
        },
        setArtistName: (state, action) => {
            state.artistname = action.payload
        }
    }
})

export const { setArtist, setAlbum, setSongs, setArtistId, setArtistName } = artistSlice.actions

export default artistSlice.reducer;