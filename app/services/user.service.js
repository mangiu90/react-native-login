import clienteAxios from "../config/axios";


const getCurrentUser = async () => {
    try {
        const response = await clienteAxios.get('me');
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
};

const users = async () => {
    try {
        const response = await clienteAxios.get('all-users');
        console.log(response.data);
        return response.data
    } catch (error) {
        throw error.response.data
    }
};


export default {
    users,
    getCurrentUser
};