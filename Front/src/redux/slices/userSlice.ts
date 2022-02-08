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
    setHobbyId: (state, action: PayloadAction<string>) => {
      state.hobbyId = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => ({
      email: action.payload.email,
      hobbyId: action.payload.hobbyId,
    }),
  },
});

export const { setUserEmail, setHobbyId, setUser } = userSlice.actions;

export default userSlice.reducer;
