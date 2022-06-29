import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface MapState {
  value: string;
}

const initialState: MapState = {
  value: '',
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setPosition: (state: MapState, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setPosition, } = mapSlice.actions;

export const selectPosition = (state: RootState) => state.map.value;

export default mapSlice.reducer;
