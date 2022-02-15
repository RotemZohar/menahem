import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  hobbyId: string;
}

const initialState: UserState = {
  id: "",
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
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => ({
      id: action.payload.id,
      email: action.payload.email,
      hobbyId: action.payload.hobbyId,
    }),
  },
});

export const { setUserEmail, setHobbyId, setUser, setUserId } =
  userSlice.actions;

export default userSlice.reducer;
