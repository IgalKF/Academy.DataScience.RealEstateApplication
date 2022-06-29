import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Item } from '../../models/item';

const initialState: Item = {
    propety_type: -1,
    rooms: -1,
    floor: -1,
    square_foot: -1,
    day: -1,
    month: -1,
    year: -1,
    lat: -1,
    lng: -1
}

export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setSearchInput: (state: Item, action: PayloadAction<Item>) => {
      state = action.payload;
    },
  },
});

export const { setSearchInput, } = searchBarSlice.actions;

export const selectSearchInput = (state: RootState) => state.searchBar;

export default searchBarSlice.reducer;
