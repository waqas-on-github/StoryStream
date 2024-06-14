import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "@/featurs/navbar/navbarSlice";
import editorReducer from "@/featurs/editor/editorSlice";
import commentReducer from "@/featurs/commentSlice";

export const store = configureStore({
  reducer: {
    navbarstate: navbarReducer,
    editorState: editorReducer,
    commentState: commentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
