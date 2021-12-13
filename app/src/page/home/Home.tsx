import * as React from 'react'
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {WrappedView} from "../../../assets/styles/styles";
import ListItems from '../../components/ListItems';

const Home = () => {
    return(
        <WrappedView>
             <ListItems/>
        </WrappedView>
    )
}

export default Home;