import clienteAxios from "../config/axios";


const getMovements = async () => {
    try {
        const response = await clienteAxios.get('movements');
        // console.log(response.data.movements);
        return response.data.movements
    } catch (error) {
        throw error.response.data
    }
};

const createMovement = async (movement) => {
    try {
        const response = await clienteAxios.post('movement/create', movement);
        return response.data.movement
    } catch (error) {
        throw error.response.data
    }
};

const getBalance = async () => {
    try {
        const response = await clienteAxios.get('balance');
        return response.data.balance
    } catch (error) {
        throw error.response.data
    }
};

export default {
    getMovements,
    getBalance,
    createMovement,
};