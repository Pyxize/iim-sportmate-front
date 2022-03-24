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
        refresh: false,
    }

    async componentDidMount() {
        console.log('didMount');
        this.callToSave()

    }

    async componentDidUpdate() {
        if (this.state.refresh) {
            console.log('didUpdate');
            this.callToSave();
        }
    }

    async callToSave() {
        console.log('call back to update');
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
    };

    render() {
        const {
            activities,
            errorMessage,
        } = this.state;

        const colorFuturActivity = ['#FFF', '#FFF'];
        const colorPastActivity = ['#DCDCDC', '#DCDCDC'];
        const today = new Date();

        const { navigation } = this.props;

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
                                    <IconBtn style={isDateInPast(item.activityDate) ? styles.btnActivityPast : ''} onPress={() => {deleteActivity(item.id)}}>
                                        <Ionicons name='remove-circle' size={40} color='#000'></Ionicons>
                                    </IconBtn>
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
    },
    btnActivityPast: {
        display: 'none'
    }
});

function isDateInPast(date: { toString: () => string | number | Date; }) {
    const today = new Date();
    const dateInput = new Date(date.toString())
    return dateInput.getTime() < today.getTime();
}

async function deleteActivity(id_activity:number) {
    let config;
    try {
        const user = await AsyncStorage.getItem('@user');
        if (user) {
            let token = user.split(",")[1].split(":")[1];
            token = token.substring(1, token.length - 2);
            config = {
                headers: { Authorization: "Bearer " + token }
            };
        }

        axios.delete(`https://sportmate-develop.herokuapp.com/api/activity/${id_activity}`, config)
        .then(res => {
            console.log('Supprimé');
        })
        .catch(error => {
            console.log("ERREUR lors de l'appel au service pour la suppression d'event ", error);
            return error;
        })
    } catch (error) {
        console.log('Delete Error: ', error);
    }
}

export default function() {
    const navigation = useNavigation();
  
    return <ListItemsHistory navigation={navigation} />
}