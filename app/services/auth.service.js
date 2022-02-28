import AsyncStorage from '@react-native-async-storage/async-storage';

import clienteAxios from "../config/axios";


const register = async (username, email, password) => {
    try {
        const response = await clienteAxios.post('/api/usuarios', datos)

    } catch (error) {
        console.log(error.response);
    }
};

const login = async ({ email, password }) => {
    try {
        const response = await clienteAxios.post('login', { email, password });
        const token = await AsyncStorage.setItem('token', response.data.access_token);
        return {
            isLoggedIn: true,
            email: response.data.email,
            userName: response.data.userName,
            token
        };
    } catch (error) {
        // console.log(error.response.data);
        throw error.response.data
    }
};

const logout = async () => {
    try {
        await clienteAxios.post('logout');
        await AsyncStorage.removeItem('token');
    } catch (error) {
        // console.log(error.response.data);
        throw error.response.data
    }
};

const isAuthenticated = async () => {
    return !! await getToken();
};

const getToken = async () => {
    return await AsyncStorage.getItem('token')
};

export default {
    register,
    login,
    logout,
    isAuthenticated,
    getToken,
};