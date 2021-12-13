import * as React from 'react'
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Colors} from '../../../assets/styles/colors'
import {
    Logo,
    PageTitle,
    PrimaryButton,
    StyledContainer,
    Buttontext,
    WrappedView,
    SafeAreaWrapped
} from "../../../assets/styles/styles";

<<<<<<< HEAD

const Welcome = ({ navigation }) => {


    return(
=======
const Welcome = ({ navigation }) => {
    return (
>>>>>>> fb6bfcf1 (Update .gitignore and add navbar)
        <SafeAreaWrapped background={Colors.secondary}>
            <StyledContainer>
                <WrappedView>
                    <Logo resizeMode="cover" source={require('../../../assets/img/SportMate_White.png')}></Logo>
                </WrappedView>

                <WrappedView>
                    <PageTitle>Bienvenue sur SportMate !</PageTitle>
                    <Text style={styles.text}>Amuse-toi et crée ton cercle de sportifs</Text>
                    <Text style={styles.text}>Nous te proposons de rejoindre un ou des partenaire(s) de sport le temps d’une séance.</Text>
                </WrappedView>

                <WrappedView>
<<<<<<< HEAD
                    <PrimaryButton onPress={() => navigation.navigate('Signin')}>
                            <Buttontext>Connexion</Buttontext>
                    </PrimaryButton>
                    <PrimaryButton onPress={() => navigation.navigate('Register')} style={styles.button}>
                            <Buttontext on>S'inscrire</Buttontext>
=======
                    <PrimaryButton>
                        <Button
                            title="Connexion"
                            onPress={() =>
                                navigation.navigate('Signin')
                            }
                        />
                    </PrimaryButton>
                    <PrimaryButton style={styles.button}>
                        <Button
                            title="Inscription"
                            onPress={() =>
                                navigation.navigate('Register')
                            }
                        />
                    </PrimaryButton>
<<<<<<< HEAD
                    <PrimaryButton style={styles.button}>
                        <Button
                            title="Accueil"
                            onPress={() =>
                                navigation.navigate('Home')
                            }
                        />
>>>>>>> fb6bfcf1 (Update .gitignore and add navbar)
                    </PrimaryButton>
=======
>>>>>>> bce98ee1 (Update Navbar)
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