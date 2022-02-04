import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  tag: string;
}

const initialState: UserState = {
  id: "",
  tag: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setTag: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setUserId, setTag } = userSlice.actions;

export default userSlice.reducer;
