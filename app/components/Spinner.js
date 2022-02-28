import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector } from 'react-redux';
import { selectLoading } from '../redux/slices/authSlice';

export default function Spinner() {
    const loading = useSelector(selectLoading);

    return (
        loading ? (
            <ActivityIndicator size="large" style={styles.spinner} />
        ) : (
            null
        )
    )
}

const styles = StyleSheet.create({
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 9999,
        backgroundColor: "#dbd9d9",
        opacity: 0.5
    },
})
