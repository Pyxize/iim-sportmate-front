import axios from 'axios';
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrimaryButton, IconBtn, WrappedView } from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons"
import { Colors } from '../../assets/styles/colors'
import { useNavigation } from "@react-navigation/native";

class ListItemsHistory extends React.Component {
    state = {
        activities: [],
        errorMessage: "",
        token: "",
    }

    async componentDidMount() {
        this.callToSave()

    }

    async componentDidUpdate() {
        const commejeveux = setTimeout(() => {
            this.callToSave()
        }, 3600000);
        
        return () => clearTimeout(commejeveux)
    }

    async callToSave() {
        let config;

        const user = await AsyncStorage.getItem('@user');
        if (user) {
            let token = user.split(",")[1].split(":")[1];
            token = token.substring(1, token.length - 2);
            config = {
                headers: { Authorization: "Bearer " + token }
            };
        }

        axios.get(`https://sportmate-develop.herokuapp.com/api/activity/user`, config)
        .then(res => {
            console.log(res.data)
            const activities = res.data;
            console.log(activities)
            this.setState({ activities: activities });
        })
        .catch(error => {
            console.log("ERREUR lors de l'appel à activity/user: ", error);
            error = error.toString();
            if (error.includes('403')) {
                this.setState({ errorMessage: "Oups vous n'êtes pas autorisé" });
            } else {
                this.setState({ errorMessage: error });
            }
            return error;
        });
    }

    render() {
        const {
            activities,
            errorMessage,
        } = this.state;

        const colorFuturActivity = ['#FFF', '#FFF'];
        const colorPastActivity = ['#DCDCDC', '#DCDCDC'];
        const today = new Date();

        const { navigation } = this.props;

        // console.log('ICIIIIIIII', JSON.stringify(navigation.getParam('saved')));
        

        return (
            <View style={styles.wrapped}>
                {errorMessage === "" ?
                    <View>
                        {
                            activities.map((item, i) => (
                                <ListItem style={styles.listItemWrapper}
                                    key={i}
                                    bottomDivider
                                    Component={TouchableScale}
                                    friction={90}
                                    tension={100}
                                    activeScale={0.95}
                                    linearGradientProps={{
                                        colors: isDateInPast(item.activityDate) ? colorPastActivity : colorFuturActivity,
                                        start: { x: 1, y: 1 },
                                        end: { x: 1, y: 1 },
                                    }}
                                    ViewComponent={LinearGradient}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title style={isDateInPast(item.activityDate) ? styles.activityPast : styles.activityFutur}>{item.activityName}</ListItem.Title>
                                        <ListItem.Subtitle style={isDateInPast(item.activityDate) ? styles.activityPast : styles.activityFutur}>{item.sport} niveau {item.activityLevel}</ListItem.Subtitle>
                                        <ListItem.Subtitle style={isDateInPast(item.activityDate) ? styles.activityPast : styles.activityFutur}>Le {item.activityDate}</ListItem.Subtitle>
                                        <ListItem.Subtitle style={isDateInPast(item.activityDate) ? styles.activityPast : styles.activityFutur}>A {item.address}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                        <WrappedView>
                            <IconBtn onPress={() => navigation.navigate('ActivityAction')}>
                                <Ionicons name='add-circle' size={40} color='#F67201'></Ionicons>
                            </IconBtn>
                        </WrappedView>
                    </View>
                    :
                    <View>
                        <Text style={styles.container}> {errorMessage}</Text>
                    </View>
                }
            </View>)
    };
}
const styles = StyleSheet.create({
    wrapped: {
        marginBottom: 50,
    },
    container: {
        marginTop: 50,
        marginLeft: 10,
        fontSize: 20
    },
    listItemWrapper: {
        marginBottom: 16,
    },
    activityPast: {
        color: 'gray'
    },
    activityFutur: {
    }
});

function isDateInPast(date: { toString: () => string | number | Date; }) {
    const today = new Date();
    const dateInput = new Date(date.toString())
    return dateInput.getTime() < today.getTime();
}

export default function() {
    const navigation = useNavigation();
  
    return <ListItemsHistory navigation={navigation} />
}