import * as React from 'react'
import {Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import Bg from "../../../../assets/img/SportMate_bg_connexion.png";
import {Logo, PageTitle, SafeAreaWrapped, StyledContainer, WrappedView} from "../../../../assets/styles/styles";
import registerBg from '../../../../assets/img/register-bg.png';
import FormRegister from "../../../components/login/register/form/FormRegister";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from '../../../services/auth.service'


const Register = ({navigation}) => {
    return(
        <SafeAreaWrapped>
            <ImageBackground source={registerBg} resizeMode="cover" style={styles.image}>
                <StyledContainer justifyContent="center">
                    <WrappedView>
                        <PageTitle>Créez votre compte</PageTitle>
                    </WrappedView>
                    <FormRegister/>
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
export default Register;