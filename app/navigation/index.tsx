/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { selectIsLoggedIn } from '../redux/slices/authSlice';
import Dashboard from '../screens/Dashboard';
import StartScreen from '../screens/auth/StartScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    isLoggedIn ? (
      <Stack.Navigator initialRouteName="dashboard">
        <Stack.Screen name="dashboard" component={Dashboard} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator initialRouteName="start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="start" component={StartScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="resetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    )
  );
}

