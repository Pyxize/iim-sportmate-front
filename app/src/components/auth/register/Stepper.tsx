import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import FormRegister from './form/FormRegister';
import AddSportRegister from './form/AddSportRegister';
import UserRegister from './form/UserRegister';
import { useState } from 'react';
import HobbiesRegister from './form/HobbiesRegister';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";

const labels = ["Identification", "Sport", "Données personnelles", "Centres d'intêret"];


const secondIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 11,
    currentStepLabelColor: '#fe7013'
};



const getStepIndicatorIconConfig = ({
    position,
    stepStatus,
}: {
    position: number;
    stepStatus: string;
}) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
        size: 15,
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'vpn-key';
            break;
        }
        case 1: {
            iconConfig.name = 'fitness-center';
            break;
        }
        case 2: {
            iconConfig.name = 'person';
            break;
        }
        case 3: {
            iconConfig.name = 'theater-comedy';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};


export default function Stepper({ setTitle }) {
    const [authData, setAuthData] = useState();
    const [sportsData, setSportsData] = useState();
    const [userData, setUserData] = useState();
    const [hobbiesData, setHobbiesData] = useState();

    const [nextTitle, setNextTitle] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const stepCount = 4

    const renderViewPagerPage = (pageNumber: any) => {
        switch (pageNumber) {
            case 0: {
                return (
                    <FormRegister setAuthData={setAuthData} setCurrentPage={setCurrentPage} setNextTitle={setTitle} />
                );
            }
            case 1: {
                return (
                    <AddSportRegister setSportsData={setSportsData} setCurrentPage={setCurrentPage} setNextTitle={setTitle} />
                );
            }
            case 2: {
                return (
                    <ScrollView>
                        <UserRegister setUserData={setUserData} setCurrentPage={setCurrentPage} setNextTitle={setTitle} />
                    </ScrollView>
                );
            }
            case 3: {
                return (
                    <HobbiesRegister setHobbiesData={setHobbiesData} setCurrentPage={setCurrentPage} setNextTitle={setTitle} />
                );
            }
            case 4: {
                setCurrentPage(5);
                setNextTitle("Créer votre compte");
                const navigation = useNavigation()

                let request: {
                    login: {
                        email: string,
                        password: string,
                    },
                    user: {
                        lastName: string,
                        firstName: string,
                        genre: string,
                        birthday: string,
                        mobilePhone: string,
                        profilePicture: string,
                    },
                    sports: [
                        {
                            name: string,
                            level: string,
                        }
                    ],
                    hobbies: [string]
                } = { "login": authData, "sports": sportsData, "hobbies": hobbiesData, "user": userData };

                console.log(request);
                axios.post(`https://sportmate-develop.herokuapp.com/api/signingAndLogin`, request)
                    .then(res => {
                        console.log(res);
                        if (res.data.token) {
                            AsyncStorage.setItem('@user', JSON.stringify(res.data))
                            navigation.navigate('Home');
                        }
                    })
                    .catch(error => {
                        console.log("ERREUR lors de l'appel à /signingAndLogin: ", error);
                        setCurrentPage(0);
                        setNextTitle("Créer votre compte");
                        navigation.navigate('Register');

                    });
            }
            default: {
                break;
            }
        }
    };

    const renderStepIndicator = (params: any) => (
        <MaterialIcons {...getStepIndicatorIconConfig(params)} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={secondIndicatorStyles}
                    currentPosition={currentPage}
                    renderStepIndicator={renderStepIndicator}
                    labels={labels}
                    stepCount={stepCount}
                />

            </View>
            {renderViewPagerPage(currentPage)}
        </View>
    );
}

const styles = StyleSheet.create({

    button: {
        marginTop: 16,
    },
    container: {
        flex: 1
    },
    stepIndicator: {
        marginVertical: 50,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
