import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShowToastAction, TOAST_STATUS, ToastStore } from '@/types/redux/toast';

const initialState: ToastStore = {
  message: '',
  open: false,
  status: TOAST_STATUS.SUCCESS,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, { payload }: PayloadAction<ShowToastAction>) => {
      state.open = true;
      state.message = payload.message;
      state.status = payload.status;
    },
    hideToast: state => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
