import * as React from 'react'
import {Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {PageTitle, SafeAreaWrapped, StyledContainer, WrappedView} from "../../../assets/styles/styles";
import Signin from "../login/signin/Signin";
import axios from "axios";
import authHeader from "../../services/auth-header";
import AuthService from '../../services/auth.service'
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import ListItems from '../../components/ListItems';
import {Colors} from "../../../assets/styles/colors";
import LinearGradient from "react-native-linear-gradient";

const Home = ({navigation}) => {
    const [item, setItem] = useState(null);
    //const [user, setUser] = useState(null)

    AsyncStorage.getItem("@user").then((value) => { setItem(value)})
    console.log('result', JSON.parse(item))


    // @ts-ignore
    return (
        <SafeAreaView>            
            <LinearGradient style={styles.lineargradient} colors={['#F0BB8E', '#9494B7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <ScrollView>
                    <SafeAreaWrapped>
                        <StyledContainer>
                            <PageTitle textColor={Colors.black}>Près de chez moi</PageTitle>
                            <ListItems/>
                        </StyledContainer>
                    </SafeAreaWrapped>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
        
    )
}
export default Home;

const styles = StyleSheet.create({
    lineargradient: {
        height: '100%'
    }
});
