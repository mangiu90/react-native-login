import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

export default function LoginScreen() {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(login({ email: 'admin@admin.com', password: 'password' }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>

      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  btn: {
    backgroundColor: 'blue',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20
  }
});