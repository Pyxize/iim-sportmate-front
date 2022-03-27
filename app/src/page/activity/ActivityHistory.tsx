import * as React from 'react'
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { PageTitle, SafeAreaWrapped, StyledContainer, WrappedView } from "../../../assets/styles/styles";
import Signin from "../auth/Login";
import axios from "axios";
import authHeader from "../../services/auth-header";
import AuthService from '../../services/auth.service'
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import ListItemsHistory from '../../components/ListItemsHistory';
import { Colors } from "../../../assets/styles/colors";
import LinearGradient from "react-native-linear-gradient";

const ActivityHistory = ({route, navigation }) => {
    const [item, setItem] = useState(null);
    //const [user, setUser] = useState(null)

    AsyncStorage.getItem("@user").then((value) => { setItem(value) })
    console.log('result', JSON.parse(item))

    // @ts-ignore
    return (
        <SafeAreaView>
            <ScrollView>
                <SafeAreaWrapped>
                    {/* <PageTitle textColor={Colors.black}> Mes évènements</PageTitle> */}
                    <ListItemsHistory update={true}/>
                </SafeAreaWrapped>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ActivityHistory;

const styles = StyleSheet.create({
    lineargradient: {
        height: '100%'
    }
});