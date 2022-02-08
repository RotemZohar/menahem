import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  hobbyId: string;
}

const initialState: UserState = {
  email: "",
  hobbyId: "",
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
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUserEmail, setTag, setUser } = userSlice.actions;

export default userSlice.reducer;
