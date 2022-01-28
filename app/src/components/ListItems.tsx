import axios from 'axios';
import React from "react";
import {FlatList, StyleSheet, SwipeableListView, TouchableNativeFeedbackComponent, View} from "react-native";
import { ListItem, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authHeader from '../services/auth-header';
import {Colors} from "../../assets/styles/colors";
import {PageTitle, SafeAreaWrapped, StyledContainer} from "../../assets/styles/styles";

export default class ListItems extends React.Component {
    state = {
        activities: [],
        errorMessage: "",
        token: ""
    }

    async componentDidMount() {

        let config;

        const user = await AsyncStorage.getItem('@user');

        if (user) {
            let token = user.split(",")[1].split(":")[1];
            token = token.substring(1, token.length - 2);
            config = {
                headers: { Authorization: "Bearer " + token }
            };
        }

        axios.get(`https://sportmate-develop.herokuapp.com/api/activity/all`, config)
            .then(res => {
               // console.log(res.data)
                const activities = res.data;
                //console.log(activities)
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
            errorMessage
        } = this.state;

        return (
            <View style={styles.wrapped}>
                {errorMessage === "" ?
                    <View>
                        {
                            activities.map((item, i) => (
                                <ListItem style={styles.listItemWrapper}
                                    key={i}
                                    Component={TouchableScale}
                                    friction={90}
                                    tension={100}
                                    activeScale={0.95}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>{item.activityName}</ListItem.Title>
                                        <ListItem.Subtitle>{item.sport} niveau {item.activityLevel}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Le {item.activityDate}</ListItem.Subtitle>
                                        <ListItem.Subtitle>A {item.address}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))
                        }
                    </View>
                    :
                    <View>
                        <Text style={styles.container}> {errorMessage}</Text>
                    </View>
                }
            </View>
            )

    };
}
const styles = StyleSheet.create({
    wrapped: {
      marginBottom: 50
    },
    container: {
        marginTop: 50,
        marginLeft: 10,
        fontSize: 20
    },
    listItemWrapper: {
        marginBottom: 16
    }
});

