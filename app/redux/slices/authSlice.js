import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../services/auth.service";
import userService from "../../services/user.service";

export const checkAuth = createAsyncThunk('userAuth/checkAuth', async () => {
    if (authService.isAuthenticated()) {
        const currentUser = await userService.getCurrentUser();
        return { currentUser };
    }
    return { currentUser: null };
});

export const login = createAsyncThunk('userAuth/login', authService.login);

export const register = createAsyncThunk('userAuth/register', authService.register);

export const logout = createAsyncThunk('userAuth/logout', authService.logout);

const startLoading = (state) => {
    state.loading = true;
    state.error = null;
}

const receiveError = (state, action) => {
    // console.log(action.error.message);
    state.loading = false;
    state.error = action.error.message;
}

const initialState = {
    loading: false,
    isLoggedIn: false,
    token: null,
    currentUser: null,
    error: null,
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {},
    extraReducers: {
        [checkAuth.pending]: startLoading,
        [checkAuth.fulfilled]: (state, { payload }) => {
            const { currentUser = null } = payload;
            state.currentUser = currentUser;
        },
        [checkAuth.rejected]: receiveError,
        [login.pending]: startLoading,
        [login.fulfilled]: (state, { payload }) => {
            const { isLoggedIn, token } = payload;

            Object.assign(state, {
                loading: false,
                isLoggedIn,
                token,
            });
        },
        [login.rejected]: receiveError,

        [register.pending]: startLoading,
        [register.fulfilled]: (state, { payload }) => {
            const { isLoggedIn, token } = payload;

            Object.assign(state, {
                loading: false,
                isLoggedIn,
                token,
            });
        },
        [register.rejected]: receiveError,

        [logout.pending]: startLoading,
        [logout.fulfilled]: (state) =>
            Object.assign(state, {
                ...initialState,
                loading: false,
            }),
        [logout.rejected]: receiveError,
    }
});

export const { setSignIn, setSignOut } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectCurrentUser = (state) => state.userAuth.currentUser;


export default authSlice.reducer;