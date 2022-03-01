import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Toast from 'react-native-toast-message';

import movementsService from "../../services/movements.service";

const startLoadingMovements = (state) => {
    state.loadingMovements = true;
}

const receiveError = (state, action) => {
    // console.log(action);
    let error = 'Ups hubo algun error!';
    if (typeof action.error.message == 'string' && action.error.message != '') {
        error = action.error.message
    }

    state.loadingMovements = false;

    Toast.show({
        type: 'error',
        text1: 'ERROR',
        text2: error
    });
}

export const getMovements = createAsyncThunk('movements/getMovements', movementsService.getMovements);

export const createMovement = createAsyncThunk('movements/createMovement', movementsService.createMovement);

export const getBalance = createAsyncThunk('movements/getBalance', movementsService.getBalance);

const initialState = {
    loadingMovements: true,
    movements: [],
    balance: 0
}

const authSlice = createSlice({
    name: 'movements',
    initialState,
    reducers: {},
    extraReducers: {
        [getMovements.pending]: startLoadingMovements,
        [getMovements.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                loadingMovements: false,
                movements: payload
            });
        },
        [getMovements.rejected]: receiveError,

        [createMovement.pending]: startLoadingMovements,
        [createMovement.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                loadingMovements: false,
                // movements: [payload, ...state.movements]
            });
        },
        [createMovement.rejected]: receiveError,

        [getBalance.pending]: startLoadingMovements,
        [getBalance.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                loadingMovements: false,
                balance: payload
            });
        },
        [getBalance.rejected]: receiveError,
    }
});

export const selectLoadingMovements = (state) => state.movements.loadingMovements;
export const selectMovements = (state) => state.movements.movements;
export const selectBalance = (state) => state.movements.balance;

export default authSlice.reducer;