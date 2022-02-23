import * as React from 'react'
import {Button, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {Logo, PageTitle, SafeAreaWrapped, StyledContainer, WrappedView} from "../../../assets/styles/styles";
// @ts-ignore
import registerBg from '../../../assets/img/register-bg.png';
import Stepper from '../../components/auth/register/Stepper';
import { useState } from 'react';


const Register = ({navigation}) => {
    const [title, setTitle] = useState("Créer votre compte");
    
    return(
        <SafeAreaWrapped>
            <ImageBackground source={registerBg} resizeMode="cover" style={styles.image}>
                <StyledContainer justifyContent="center">
                    <WrappedView>
                        <PageTitle>{title}</PageTitle>
                    </WrappedView>
                    <Stepper setTitle={setTitle} />
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