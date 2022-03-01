import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function Spinner({loading}) {
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
