import * as React from 'react'
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Colors} from '../../assets/styles/colors'
import {
    Logo,
    PageTitle,
    PrimaryButton,
    StyledContainer,
    Buttontext,
    WrappedView,
    SafeAreaWrapped
} from "../../assets/styles/styles";
import {Link} from "react-router-native";

const Welcome = () => {

    return(
        <SafeAreaWrapped background={Colors.secondary}>
            <StyledContainer>
                <WrappedView>
                    <Logo resizeMode="cover" source={require('../../assets/img/SportMate_White.png')}></Logo>
                </WrappedView>

                <WrappedView>
                    <PageTitle>Bienvenue sur SportMate !</PageTitle>
                    <Text style={styles.text}>Amuse-to et crée ton cercle de sportifs</Text>
                    <Text style={styles.text}>Nous te proposons de rejoindre un ou des partenaire(s) de sport le temps d’une séance.</Text>
                </WrappedView>

                <WrappedView>
                    <PrimaryButton>
                        <Link to="/signin">
                            <Buttontext>Connexion</Buttontext>
                        </Link>
                    </PrimaryButton>
                    <PrimaryButton style={styles.button}>
                        <Link to="/register">
                            <Buttontext>S'inscrire</Buttontext>
                        </Link>
                    </PrimaryButton>
                </WrappedView>
            </StyledContainer>
        </SafeAreaWrapped>
    )
}


const styles = StyleSheet.create({
    text: {
        marginTop: 16,
        padding: 8,
        fontSize: 16,
        color: Colors.white,
        textAlign: "center",
    },
    button:{
        marginTop: 16,
    }
})
export default Welcome