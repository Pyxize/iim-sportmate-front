import * as React from 'react'
import { ImageBackground, StyleSheet } from "react-native";
import { PageTitle, SafeAreaWrapped, StyledContainer, WrappedView } from "../../../assets/styles/styles";
// @ts-ignore
import registerBg from '../../../assets/img/register-bg.png';
import Stepper from '../../components/auth/register/Stepper';
import { useState } from 'react';


const Register = ({ navigation }) => {
    const [title, setTitle] = useState("Créer votre compte");

    return (
        <ImageBackground source={registerBg} resizeMode="cover" style={styles.image}>
            <SafeAreaWrapped>
                <StyledContainer justifyContent="center">
                    <WrappedView>
                        <PageTitle>{title}</PageTitle>
                    </WrappedView>
                    <Stepper setTitle={setTitle} />
                </StyledContainer>
            </SafeAreaWrapped>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
})
export default Register;