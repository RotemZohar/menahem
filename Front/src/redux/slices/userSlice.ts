import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  tag: string;
}

const initialState: UserState = {
  email: "",
  tag: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setTag: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail, setTag } = userSlice.actions;

export default userSlice.reducer;
