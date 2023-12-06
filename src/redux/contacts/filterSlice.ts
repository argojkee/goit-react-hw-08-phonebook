import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type State = {
  filter: string;
};

const initialState: State = {
  filter: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterValue: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { changeFilterValue } = filterSlice.actions;

export const getFilter = (state: RootState) => state.filter.filter;
