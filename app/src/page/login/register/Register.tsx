import * as React from 'react'
import {Button, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import Bg from "../../../../assets/img/SportMate_bg_connexion.png";
import {Logo, PageTitle, SafeAreaWrapped, StyledContainer, WrappedView} from "../../../../assets/styles/styles";
import registerBg from '../../../../assets/img/register-bg.png';
import FormRegister from "../../../components/login/register/form/FormRegister";
import Stepper from '../../../components/login/register/form/Stepper';
import { useState } from 'react';


const Register = ({navigation}) => {
    const [parentCounter, setParentCounter] = useState("Créez votre compte");
    
    return(
        <SafeAreaWrapped>
            <ImageBackground source={registerBg} resizeMode="cover" style={styles.image}>
                <StyledContainer justifyContent="center">
                    <WrappedView>
                        <PageTitle>{parentCounter}</PageTitle>
                    </WrappedView>
                    <Stepper setParentCounter={setParentCounter} />
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