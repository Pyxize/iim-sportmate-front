import * as React from 'react'
import {Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Logo, SafeAreaWrapped, StyledContainer, WrappedView} from "../../../assets/styles/styles";
// @ts-ignore
import Bg from '../../../assets/img/SportMate_bg_connexion.png';
import {FormProvider} from "react-hook-form";
import LoginForm from '../../components/auth/login/LoginForm';

const Login = ({navigation}) => {

    return(
        <SafeAreaWrapped>
            <ImageBackground source={Bg} resizeMode="cover" style={styles.image}>
            <StyledContainer justifyContent="center">
               <WrappedView>
                   <Logo resizeMode="cover" source={require('../../../assets/img/SportMate_connexion.png')}></Logo>
               </WrappedView>
               <LoginForm />
            </StyledContainer>
            </ImageBackground>
        </SafeAreaWrapped>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
})
export default Login;