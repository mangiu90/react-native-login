import { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { getBalance, getMovements, selectBalance, selectLoadingMovements, selectMovements } from '../../redux/slices/movementsSlice';

import Spinner from '../../components/Spinner';
import MovementsList from '../../components/movementsList';

const MovementsScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const loadingMovements = useSelector(selectLoadingMovements);
    const movements = useSelector(selectMovements);
    const balance = useSelector(selectBalance);
    const balanceColor = balance.charAt(0) === '-' ? 'red' : 'green';

    useEffect(() => {
        dispatch(getMovements());
        dispatch(getBalance());
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => navigation.navigate('movement/create')}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>
                    <AntDesign
                        name="pluscircle"
                        size={25}
                        color={'black'}
                        style={{ marginRight: 10 }}
                    />
                </Pressable>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Spinner loading={loadingMovements} />

            <Text style={[styles.balance, {color: balanceColor}]}>$ {balance}</Text>

            <GestureHandlerRootView style={{ width: '100%', height: '100%' }}>
                <MovementsList data={movements} />
            </GestureHandlerRootView>
        </View>
    )
}

export default MovementsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    balance: {
        padding: 30,
        marginVertical: 10,
        marginHorizontal: 20,
        fontSize: 40,
    },
})