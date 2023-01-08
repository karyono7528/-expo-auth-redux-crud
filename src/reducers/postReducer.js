import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Posts } from '../model/posts';

const initialState = Posts; 

const postReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        id: nanoid(),
        title: action.payload.post,
        author: action.payload.post,
      };
      state.push(newPost);
    },
    editPost: (state, action) => {
      const { id, title, author } = action.payload;
      const foundPost = state.find((post) => post.id === id);
      if (foundPost) {
        foundPost.title = title;
        foundPost.author = author;
      }
    },
    deletePost: (state, action) => {
      const foundPost = state.find((post) => post.id === action.payload.id);
      if (foundPost) {
        state.splice(state.indexOf(foundPost), 1);
      }
    },
  },
});

export const { addPost, editPost, deletePost } = postReducer.actions;
export default postReducer.reducer;