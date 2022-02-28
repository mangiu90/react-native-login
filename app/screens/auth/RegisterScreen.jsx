import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { theme } from '../../config/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { nameValidator } from '../../helpers/nameValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { register } from '../../redux/slices/authSlice'

import BackButton from '../../components/auth/BackButton'
import Background from '../../components/auth/Background'
import Button from '../../components/auth/Button'
import Header from '../../components/auth/Header'
import Logo from '../../components/auth/Logo'
import TextInput from '../../components/auth/TextInput'

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState({ value: 'user1', error: '' })
  const [email, setEmail] = useState({ value: 'user1@user.com', error: '' })
  const [password, setPassword] = useState({ value: 'password', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    dispatch(register({ name: name.value, email: email.value, password: password.value }));
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})