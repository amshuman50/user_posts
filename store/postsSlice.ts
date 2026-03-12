import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/types/post';

interface PostsState {
  list: Post[];
}

const initialState: PostsState = {
  list: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.list = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.list.push(action.payload);
    },
    clearPosts(state) {
      state.list = [];
    },
  },
});

export const { setPosts, addPost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
