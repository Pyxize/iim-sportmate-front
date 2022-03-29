import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from "react";
import { Button, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrimaryButton, IconBtn, WrappedView } from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from "@expo/vector-icons/Ionicons"
import { Colors } from '../../assets/styles/colors'
import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

const ListItemsHistory = ({ update }) => {
    const [activities, setActivities] = useState([])

    const [errorMessage, setErrorMessage] = useState("")

    // let callback = update;
    const colorFuturActivity = '#FFF';
    const colorPastActivity = '#DCDCDC';
    const navigation = useNavigation();

    const [test, setTest] = useState(true)

    useEffect(() => {
        console.log('activities', activities)
        callToSave()
    }, [update]);


    const callToSave = async () => {
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
                const activities = res.data;
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

    const deleteActivity = async (id_activity: number, rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...activities];
        const prevIndex = activities.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);
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

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    // const deleteRow = (rowMap, rowKey) => {
    //     closeRow(rowMap, rowKey);
    //     const newData = [...activities];
    //     const prevIndex = activities.findIndex(item => item.key === rowKey);
    //     newData.splice(prevIndex, 1);
    //     setActivities(newData);
    // };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <View>
                    <Text style={isDateInPast(data.item.activityDate) ? styles.activityPast : styles.activityFutur}>{data.item.activityName}</Text>
                    <Text style={isDateInPast(data.item.activityDate) ? styles.activityPast : styles.activityFutur}>{data.item.sport} niveau {data.item.activityLevel}</Text>
                    <Text style={isDateInPast(data.item.activityDate) ? styles.activityPast : styles.activityFutur}> Le {data.item.activityDate}</Text>
                    <Text style={isDateInPast(data.item.activityDate) ? styles.activityPast : styles.activityFutur}> A {data.item.address}</Text>
                </View >
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.id)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteActivity(data.item.id, rowMap, data.item.id)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            {errorMessage === "" ?
                <View>
                    <View style={styles.container}>
                        <SwipeListView
                            keyExtractor={(rowData, index) => {
                                return rowData.id.toString();
                            }}
                            data={activities}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            leftOpenValue={75}
                            rightOpenValue={-150}
                            onRowDidOpen={onRowDidOpen}
                        />
                    </View>

                    <WrappedView>
                        <IconBtn onPress={() => {
                            navigation.navigate('ActivityAction', { activity: null });
                        }}>
                            <Ionicons name='add-circle' size={40} color='#F67201'></Ionicons>
                        </IconBtn>
                    </WrappedView>
                </View >
                :
                <View>
                    <Text style={styles.container}> {errorMessage}</Text>
                </View>
            }
        </View >
    )

}
export default ListItemsHistory;


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 100,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    wrapped: {
        marginBottom: 50,
    },
    // container: {
    //     marginTop: 50,
    //     marginLeft: 10,
    //     fontSize: 20
    // },
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
})
