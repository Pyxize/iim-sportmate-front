import axios from 'axios';
import React from "react";
import { StyleSheet, SwipeableListView, TouchableNativeFeedbackComponent, View } from "react-native";
import { ListItem, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authHeader from '../services/auth-header';

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
            errorMessage
        } = this.state;

        return (
            <View>
                {errorMessage === "" ?
                    <View>
                        {
                            activities.map((item, i) => (
                                <ListItem style={{
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                                    key={i}
                                    bottomDivider
                                    Component={TouchableScale}
                                    friction={90}
                                    tension={100}
                                    activeScale={0.95}
                                    linearGradientProps={{
                                        colors: ['#FF9800', '#F44336'],
                                        start: { x: 1, y: 0 },
                                        end: { x: 0.2, y: 0 },
                                    }}
                                    ViewComponent={LinearGradient}
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
            </View>)
    };
}
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginLeft: 10,
        fontSize: 20
    }
});

