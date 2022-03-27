import axios from 'axios';
import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Text, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

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
                                <ListItem.Swipeable 
                                    bottomDivider={true}
                                    // containerStyle={{ backgroundColor:'red'}}
                                    key={i}
                                    Component={TouchableScale}
                                    friction={90}
                                    activeScale={0.95}
                                    // linearGradientProps={{
                                    //     colors: ['#F0BB8E', '#9494B7'],
                                    //     start: { x: 0, y: 0 },
                                    //     end: { x: 1, y: 0 },
                                    // }}
                                    // ViewComponent={LinearGradient}
                                    rightContent={
                                        <Button
                                            title="Delete"
                                            onPress={() => console.log("Je veux delete")}
                                            icon={{ name: 'delete', color: 'white' }}
                                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                        />
                                    }
                                    leftContent={
                                        <Button
                                            title="Info"
                                            onPress={() => console.log("Je veux infos")}
                                            icon={{ name: 'info', color: 'white' }}
                                            buttonStyle={{ minHeight: '100%' }}
                                        />
                                    }
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>{item.activityName}</ListItem.Title>
                                        <ListItem.Subtitle>{item.sport} niveau {item.activityLevel}</ListItem.Subtitle>
                                        <ListItem.Subtitle>Le {item.activityDate}</ListItem.Subtitle>
                                        <ListItem.Subtitle>A {item.address}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem.Swipeable>
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
        fontSize: 20
    }
});

