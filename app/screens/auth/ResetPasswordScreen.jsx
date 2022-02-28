import { useState } from "react"

import { emailValidator } from "../../helpers/emailValidator"

import BackButton from "../../components/auth/BackButton"
import Background from "../../components/auth/Background"
import Button from "../../components/auth/Button"
import Header from "../../components/auth/Header"
import Logo from "../../components/auth/Logo"
import TextInput from "../../components/auth/TextInput"


export default function ResetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })

    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        navigation.navigate('login')
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Restore Password</Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive email with password reset link."
            />
            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}
            >
                Send Instructions
            </Button>
        </Background>
    )
}