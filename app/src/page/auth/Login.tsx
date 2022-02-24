import * as React from 'react'
import { ImageBackground, StyleSheet } from "react-native";
import { Logo, SafeAreaWrapped, StyledContainer, WrappedView } from "../../../assets/styles/styles";
// @ts-ignore
import Bg from '../../../assets/img/SportMate_bg_connexion.png';
import LoginForm from '../../components/auth/login/LoginForm';

const Login = ({ navigation }) => {

    return (
        <ImageBackground source={Bg} resizeMode="cover" style={styles.image}>
            <SafeAreaWrapped>
                <StyledContainer justifyContent="center">
                    <WrappedView>
                        <Logo resizeMode="cover" source={require('../../../assets/img/SportMate_connexion.png')}></Logo>
                    </WrappedView>
                    <LoginForm />
                </StyledContainer>
            </SafeAreaWrapped>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
    },
})
export default Login;