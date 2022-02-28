import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: "https://9095-190-138-196-119.ngrok.io/api/"
});

clienteAxios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = "Bearer " + token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

export default clienteAxios;