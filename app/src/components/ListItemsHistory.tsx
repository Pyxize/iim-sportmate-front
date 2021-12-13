import axios from 'axios';
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { ListItem, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import { SafeAreaWrapped, StyledContainer, WrappedView } from '../../assets/styles/styles';
import AddButton from './button/AddButton';

export default class ListItemsHistory extends React.Component {
    state = {
        activities: [],
        errorMessage: ""
    }


    componentDidMount() {
        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVrSldUIiwic3ViIjoic3lsdmllQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MzkzOTUwNzgsImV4cCI6MTYzOTM5NTY3OH0.klQwdcwM6oGYxmZ6d7Iq99BX6PjBs6x3SUuDw-ZykHTcLdrOok3kRsU8jZx-W0f5Tn-rHNlX-735szsZFw6GVQ` }
        };
        axios.get(`https://sportmate-develop.herokuapp.com/api/activity/user`, config)//CHANGE
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


        const colorFuturActivity = ['#F44336', '#FF9800'];
        const colorPastActivity = ['#696969', '#A9A9A9'];
        const today = new Date();

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
                                        colors: isDateInPast(item.activityDate) ? colorPastActivity : colorFuturActivity,
                                        start: { x: 1, y: 0 },
                                        end: { x: 0.2, y: 0 },
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
                        <AddButton />
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
        marginLeft: 50,
        fontSize: 20
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
