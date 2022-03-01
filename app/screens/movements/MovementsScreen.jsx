import { useEffect, useState } from 'react'
import { FlatList, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import Spinner from '../../components/Spinner';
import { getBalance, getMovements, selectBalance, selectLoadingMovements, selectMovements } from '../../redux/slices/movementsSlice';

const MovementsScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const loadingMovements = useSelector(selectLoadingMovements);
    const movements = useSelector(selectMovements);
    const balance = useSelector(selectBalance);

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

    const Item = ({ item, textColor, sign }) => (
        <Text style={[styles.item, textColor]}>{sign + item.amount}</Text>
    );

    const renderItem = ({ item }) => {
        const color = item.type === 'ENTRY' ? 'green' : 'red';
        const sign = item.type === 'ENTRY' ? '' : '-';

        return (
            <Item
                item={item}
                textColor={{ color }}
                sign={sign}
            />
        );
    };


    return (
        <View style={styles.container}>
            <Spinner loading={loadingMovements} />
            <Text style={styles.balance}>{balance}</Text>
            <FlatList
                data={movements}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
    item: {
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8,
        fontSize: 28,
    },
})