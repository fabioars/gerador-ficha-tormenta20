import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializedSheetInterface } from 't20-sheet-builder';

export interface SavedSheet {
  id: string;
  sheet: SerializedSheetInterface;
  date: number;
  name: string;
  image: string;
}

export interface SheetStorageDefinition {
  sheets: Record<string, SavedSheet>;
  activeSheetId: string;
}

const initialState: SheetStorageDefinition = {
  sheets: {},
  activeSheetId: '',
};

export const sheetStorageSlice = createSlice({
  name: 'sheetBuilder/storage',
  initialState,
  reducers: {
    setSheet: (state, action: PayloadAction<SavedSheet>) => {
      state.sheets[action.payload.id] = action.payload;
    },
    setActiveSheet(state, action: PayloadAction<string>) {
      state.activeSheetId = action.payload;
    },
  },
});

export const selectStoredSheets = (state: RootState) =>
  state.sheetStorage.sheets;

// export const selectActiveSheet = (state: RootState) =>
//   state.sheetStorage.sheets.find(
//     (sheetStored) => sheetStored.id === state.sheetStorage.activeSheetId
//   );

export const { setSheet, setActiveSheet } = sheetStorageSlice.actions;

export default sheetStorageSlice;
