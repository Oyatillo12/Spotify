import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    liked: []
}


export const LikeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        likePost: (state, action) => {
            return {
                liked: [...state.liked, action.payload],
            }
        },
    },
})

export const { likePost } = LikeSlice.actions;