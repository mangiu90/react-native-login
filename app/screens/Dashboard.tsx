import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import userService from '../services/user.service';
import { checkAuth, logout, selectCurrentUser } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function Dashboard() {
  const dispatch = useDispatch();
  const {name, email} = useSelector(selectCurrentUser) ?? {name:'', email:''};

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
      
    } catch(e) {
      // error reading value
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.title}>name: {name}</Text>
      <Text style={styles.title}>email: {email}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.btn}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getCurrentUser} style={styles.btn}>
        <Text style={styles.text}>Current User</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getUsers} style={styles.btn}>
        <Text style={styles.text}>Users</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getToken} style={styles.btn}>
        <Text style={styles.text}>getToken</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
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
