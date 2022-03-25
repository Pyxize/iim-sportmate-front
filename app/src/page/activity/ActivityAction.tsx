import * as React from 'react'
import {SafeAreaWrapped, StyledContainer} from "../../../assets/styles/styles";
import {ImageBackground, StyleSheet, ScrollView} from "react-native";
import Bg from '../../../assets/img/SportMate_bg_connexion.png';
import ActivityForm from '../../components/form/ActivityForm'

const ActivityAction = ({route, navigation}) => {

    const { activity } = route.params

    // @ts-ignore
    return (
        <ScrollView>
            <ImageBackground source={Bg} resizeMode="cover" style={styles.image}>
                <StyledContainer justifyContent="center">
                    <ActivityForm activity={activity}/>
                </StyledContainer>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
    },
})

export default ActivityAction;
