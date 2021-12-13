import * as React from 'react'
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {WrappedView} from "../../../assets/styles/styles";
import Signin from "../login/signin/Signin";
import axios from "axios";
import authHeader from "../../services/auth-header";
import AuthService from '../../services/auth.service'
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {get, set} from "react-hook-form";

<<<<<<< HEAD


const Home = ({navigation}) => {


    const [item, setItem] = useState(null);
    //const [user, setUser] = useState(null)

    AsyncStorage.getItem("@user").then((value) => { setItem(value)})
    console.log('result', JSON.parse(item))


    // @ts-ignore
    return (
=======
const Homepage = () => {
    return(
>>>>>>> fb6bfcf1 (Update .gitignore and add navbar)
        <WrappedView>
            <Text>
             La home
            </Text>
        </WrappedView>
    )
}

<<<<<<< HEAD
export default Home;
=======
export default Homepage;
>>>>>>> fb6bfcf1 (Update .gitignore and add navbar)
