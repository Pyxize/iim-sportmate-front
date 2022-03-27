import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ListItem, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrimaryButton, IconBtn, WrappedView } from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons"
import { Colors } from '../../assets/styles/colors'
import { useNavigation } from "@react-navigation/native";


const ListItemsHistory = ({ update }) => {
    const [activities, setActivities] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    // let callback = update;
    const colorFuturActivity = '#FFF';
    const colorPastActivity = '#DCDCDC';
    const navigation = useNavigation();

    const [test, setTest] = useState(true)
    console.log('*******************ListItemsHistory*******************', update)
    console.log('*******************update value', update)

    useEffect(() => {
        console.log('activities', activities)
        callToSave()
    }, [update]);


    const callToSave = async () => {
        console.log('*******************APPEL CALL TO SAVE*******************', test)
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
                // console.log(res.data)
                const activities = res.data;
                // this.setState({ activities: activities });
                setActivities(activities);

                update = false
                console.log("Je refresh ma data")
            })
            .catch(error => {
                console.log("ERREUR lors de l'appel à activity/user: ", error);
                error = error.toString();
                if (error.includes('403')) {
                    setErrorMessage("Oups vous n'êtes pas autorisé")
                    //this.setState({ errorMessage: "Oups vous n'êtes pas autorisé" });
                } else {
                    //this.setState({ errorMessage: error });
                    setErrorMessage('erreur')
                }
                return error;
            });
        setTest(false)
        console.log("Après l'appel à calltoUpdate j'ai ", test)
    };

    const isDateInPast = (date: { toString: () => string | number | Date; }) => {
        const today = new Date();
        const dateInput = new Date(date.toString())
        return dateInput.getTime() < today.getTime();
    }

    const deleteActivity = async (id_activity: number) => {
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
                    console.log(`Activité ${id_activity} bien supprimée`);
                    callToSave()
                })
                .catch(error => {
                    console.log(`ERREUR lors de la suppression de l'activité ${id_activity}`, error);
                    return error;
                })
        } catch (error) {
            console.log('Delete Error: ', error);
        }
    }

    return (
        <View>
            {errorMessage === "" ?
                <View>
                    {
                        activities.map((item, i) => (
                            <ListItem.Swipeable
                                containerStyle={{ backgroundColor: (isDateInPast(item.activityDate) ? colorPastActivity : colorFuturActivity) }}
                                bottomDivider={true}
                                rightContent={
                                    <Button
                                        title="Delete"
                                        onPressIn={() => deleteActivity(item.id)}
                                        icon={{ name: 'delete', color: 'white' }}
                                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                    />
                                }
                                leftContent={
                                    <Button
                                        title="Info"
                                        onPressIn={() => {
                                            if (!isDateInPast(item.activityDate)) {
                                                navigation.navigate('ActivityAction', { activity: item });
                                            }
                                        }}
                                        icon={{ name: 'info', color: 'white' }}
                                        buttonStyle={{ minHeight: '100%' }}
                                    />
                                }
                                key={i}
                                friction={90}
                                activeScale={0.95}
                                // linearGradientProps={{
                                //     colors: isDateInPast(item.activityDate) ? colorPastActivity : colorFuturActivity,
                                //     start: { x: 1, y: 1 },
                                //     end: { x: 1, y: 1 },
                                // }}
                                // ViewComponent={LinearGradient}
                                onPress={() => {
                                    if (!isDateInPast(item.activityDate)) {
                                        console.log(" BEFORE SET Update to do ??????? ", test)
                                        console.log(" AFTer SET Update to do ??????? ", test)
                                        navigation.navigate('ActivityAction', { activity: item });
                                        setTest(true);
                                        console.log(" AFTer navigate Update to do ??????? ", test)
                                    }
                                }}
                            >
                                <ListItem.Content>
                                    <ListItem.Title
                                        style={isDateInPast(item.activityDate) ? styles.activityPast : styles.activityFutur}>{item.activityName}</ListItem.Title>
                                    <ListItem.Subtitle
                                        style={isDateInPast(item.activityDate) ? styles.activityPast : styles.activityFutur}>{item.sport} niveau {item.activityLevel}</ListItem.Subtitle>
                                    <ListItem.Subtitle
                                        style={isDateInPast(item.activityDate) ? styles.activityPast : styles.activityFutur}>Le {item.activityDate}</ListItem.Subtitle>
                                    <ListItem.Subtitle
                                        style={isDateInPast(item.activityDate) ? styles.activityPast : styles.activityFutur}>A {item.address}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem.Swipeable>
                        ))
                    }
                    <WrappedView>
                        <IconBtn onPress={() => {
                            navigation.navigate('ActivityAction', { activity: null });
                        }}>
                            <Ionicons name='add-circle' size={40} color='#F67201'></Ionicons>
                        </IconBtn>
                    </WrappedView>
                </View>
                :
                <View>
                    <Text style={styles.container}> {errorMessage}</Text>
                </View>
            }
        </View>
    )

}
export default ListItemsHistory;

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
    activityFutur: {},
    btnActivityPast: {
        display: 'none'
    }
})
