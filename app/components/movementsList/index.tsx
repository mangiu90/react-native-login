import React, { Component } from 'react';
import { StyleSheet, Text, View, I18nManager, Alert } from 'react-native';

import { FlatList, RectButton } from 'react-native-gesture-handler';

import GmailStyleSwipeableRow from './GmailStyleSwipeableRow';

//  To toggle LTR/RTL change to `true`
I18nManager.allowRTL(true);

type DataRow = {
    category: any;
    type: string;
    amount: string;
};

const Row = ({ item, textColor, sign }: { item: DataRow, textColor: any, sign: string }) => (
    <RectButton style={styles.rectButton} onPress={() => Alert.alert('hola')}>
        <Text style={styles.fromText}>{item.category.name}</Text>
        <Text numberOfLines={2} style={[styles.messageText, textColor]}>
            {sign + item.amount}
        </Text>
        {/* <Text style={styles.dateText}>{item.when} ❭</Text> */}
    </RectButton>
);

const SwipeableRow = ({ item, index }: { item: DataRow; index: number }) => {
    const color = item.type === 'ENTRY' ? 'green' : 'red';
    const sign = item.type === 'ENTRY' ? '' : '-';

    return (
        <GmailStyleSwipeableRow>
            <Row 
                item={item} 
                textColor={{ color }}
                sign={sign}
            />
        </GmailStyleSwipeableRow>
    );
};

export default class MovementsList extends Component<{ data?: DataRow[] }> {
    render() {
        return (
            <FlatList
                data={this.props.data}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item, index }) => (
                    <SwipeableRow item={item} index={index} />
                )}
                keyExtractor={(_item, index) => `message ${index}`}
            />
        );
    }
}

const styles = StyleSheet.create({
    rectButton: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    separator: {
        backgroundColor: 'rgb(200, 199, 204)',
        height: StyleSheet.hairlineWidth,
    },
    fromText: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    messageText: {
        color: '#999',
        backgroundColor: 'transparent',
    },
    dateText: {
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 20,
        top: 10,
        color: '#999',
        fontWeight: 'bold',
    },
});