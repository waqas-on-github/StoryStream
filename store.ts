import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/featurs/profileSlice";
import editorReducer from "@/featurs/editorSlice";

export const store = configureStore({
  reducer: {
    editorState: editorReducer,
    profileState: profileReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
