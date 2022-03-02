import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import userService from '../services/user.service';
import { checkAuth, logout, selectCurrentUser } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import movementsService from '../services/movements.service';

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  const { name, email } = useSelector(selectCurrentUser) ?? { name: '', email: '' };

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
  }

  const getCurrentUser = async () => {
    await userService.getCurrentUser()
  }

  const getUsers = async () => {
    await userService.users()
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log(value);

    } catch (e) {
      // error reading value
    }
  }

  const getMovements = async () => {
    const res = await movementsService.getMovements();
    console.log(res);
  }

  const createMovement = async () => {
    const res = await movementsService.createMovement({
      category_id: 1,
      type: 'ENTRY',
      amount: 1000,
      description: 'prueba',
    });
    console.log(res);
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.title}>name: {name}</Text>
      <Text style={styles.title}>email: {email}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.btn}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('movements')} style={styles.btn}>
        <Text style={styles.text}>Movimientos</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={createMovement} style={styles.btn}>
        <Text style={styles.text}>createMovement</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity onPress={getMovements} style={styles.btn}>
        <Text style={styles.text}>getMovements</Text>
      </TouchableOpacity> */}


      {/* <TouchableOpacity onPress={getCurrentUser} style={styles.btn}>
        <Text style={styles.text}>Current User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getUsers} style={styles.btn}>
        <Text style={styles.text}>Users</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getToken} style={styles.btn}>
        <Text style={styles.text}>getToken</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showToast} style={styles.btn}>
        <Text style={styles.text}>Show toast</Text>
      </TouchableOpacity> */}
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
