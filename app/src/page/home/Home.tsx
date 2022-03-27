import * as React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, } from "react-native";
import {PageTitle, SafeAreaWrapped, StyledContainer} from "../../../assets/styles/styles";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";
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
            {/* <LinearGradient style={styles.lineargradient} colors={['#F0BB8E', '#9494B7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}> */}
                <ScrollView>
                    <SafeAreaWrapped>
                            {/* <PageTitle textColor={Colors.black}>Près de chez moi</PageTitle> */}
                            <ListItems/>
                    </SafeAreaWrapped>
                </ScrollView>
            {/* </LinearGradient> */}
        </SafeAreaView>
        
    )
}
export default Home;

const styles = StyleSheet.create({
    lineargradient: {
        height: '100%'
    }
});
