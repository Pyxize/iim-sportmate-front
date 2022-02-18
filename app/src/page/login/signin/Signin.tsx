import * as React from 'react'
import {Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Logo, SafeAreaWrapped, StyledContainer, WrappedView} from "../../../../assets/styles/styles";
import Form from "../../../components/login/login/Form";
// @ts-ignore
import Bg from '../../../../assets/img/SportMate_bg_connexion.png';
import {FormProvider} from "react-hook-form";

const Signin = ({navigation}) => {

    return(
        <SafeAreaWrapped>
            <ImageBackground source={Bg} resizeMode="cover" style={styles.image}>
            <StyledContainer justifyContent="center">
               <WrappedView>
                   <Logo resizeMode="cover" source={require('../../../../assets/img/SportMate_connexion.png')}></Logo>
               </WrappedView>
               <Form />
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
export default Signin;