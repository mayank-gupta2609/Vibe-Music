import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    album: null,
    tracks: null,
    albumid: '_',
    name: ''
}

const artistSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAlbum: (state, action) => {
            state.album = action.payload
        },
        settracks: (state, action) => {
            state.tracks = action.payload
        },
        setAlbumId: (state, action) => {
            state.albumid = action.payload
        },
        setAlbumName: (state, action) => {
            state.name = action.payload
        },
    }
})

export const { setAlbum, settracks, setAlbumId, setAlbumName } = artistSlice.actions

export default artistSlice.reducer;