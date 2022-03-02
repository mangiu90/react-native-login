import React, { Component } from 'react';
import { Animated, StyleSheet, I18nManager, View } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import {AntDesign} from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

export default class GmailStyleSwipeableRow extends Component {
    private renderLeftActions = (
        _progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation
    ) => {
        const scale = dragX.interpolate({
            inputRange: [0, 80],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={styles.leftAction} onPress={this.close}>
                <AnimatedIcon
                    name="edit"
                    size={20}
                    color="#fff"
                    style={[styles.actionIcon]}
                />
            </RectButton>
        );
    };
    private renderRightActions = (
        _progress: Animated.AnimatedInterpolation,
        dragX: Animated.AnimatedInterpolation
    ) => {
        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <RectButton style={styles.rightAction} onPress={this.close}>
                <AnimatedIcon
                    name="delete"
                    size={20}
                    color="#fff"
                    style={[styles.actionIcon]}
                />
            </RectButton>
        );
    };

    private swipeableRow?: Swipeable;

    private updateRef = (ref: Swipeable) => {
        this.swipeableRow = ref;
    };
    private close = () => {
        this.swipeableRow?.close();
    };
    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={2}
                leftThreshold={80}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderLeftActions={this.renderLeftActions}
                renderRightActions={this.renderRightActions}>
                {children}
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#388e3c',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    },
    actionIcon: {
        width: 30,
        marginHorizontal: 10,
        // backgroundColor: 'plum',
        height: 20,
    },
    rightAction: {
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#dd2c00',
        flex: 1,
        justifyContent: 'flex-end',
    },
});