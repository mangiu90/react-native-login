import Background from "../../components/auth/Background";
import Button from "../../components/auth/Button";
import Header from "../../components/auth/Header";
import Logo from "../../components/auth/Logo";
import Paragraph from "../../components/auth/Paragraph";


export default function StartScreen({ navigation }) {
    return (
        <Background>
            <Logo />
            <Header>Login Template</Header>
            <Paragraph>
                The easiest way to start with your amazing application.
            </Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('login')}
            >
                Login
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('register')}
            >
                Sign Up
            </Button>
        </Background>
    )
}