import { Controller, useForm } from "react-hook-form"
import { Text, View, TextInput, Button, Alert, StyleSheet, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../../assets/styles/colors'
import { Buttontext, PrimaryButton, StyledContainer, WrappedView, PageTitle } from "../../../assets/styles/styles";
import React, { useState, useRef } from 'react';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from "react-native-picker-select";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import axios from 'axios';
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextLabel, TextError, formStyles} from "../../../assets/styles/form";

type FormData = {
    activityName: string;
    description: string;
    sport: string;
    activityLevel: string;
    activityDate: string;
    address: string;
    participant: string;
    contact: string;
    isEvent: boolean;
}

const Form = () => {
    const { control, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();
    const navigation = useNavigation();

    let config;
    let errorMessage;

    const onSubmit = async (data: any) => {
        const user = await AsyncStorage.getItem('@user');

        if (user) {
            let token = user.split(",")[1].split(":")[1];
            token = token.substring(1, token.length - 2);
            config = {
                headers: { Authorization: "Bearer " + token }
            };
        }

        console.log(data);
        console.log('CONFIIIIG', config);
        axios.post(`https://sportmate-develop.herokuapp.com/api/activity`, data, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigation.navigate('Évènement', { saved: 'saved' })
            })
            .catch(error => {
                console.log("ERREUR lors de l'appel à activity/user: ", error);
                error = error.toString();
                if (error.includes('403')) {
                    errorMessage = "Oups vous n'êtes pas autorisé";
                } else {
                    errorMessage = error;
                }
                return errorMessage;
            });
    }
    const [date, setDate] = useState(new Date());
    const [itemLevel, setItemLevel] = useState([
        { label: 'Débutant', value: 'Débutant' },
        { label: 'Intermédiaire', value: 'Intermédiaire' },
        { label: 'Confirmé', value: 'Confirmé' }
    ]);
    const [itemSport, setItemSport] = useState([
        { label: 'Course', value: 'Course à pied' },
        { label: 'Natation', value: 'Natation' },
    ]);
   

    return (
        <SafeAreaView>
            <PageTitle>Création d'évènement</PageTitle>
            <View>
                <TextLabel>Nom de l'évènement: </TextLabel>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={formStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="activityName"
                />

                <TextLabel>Description: </TextLabel>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={formStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="description"
                />

                <TextLabel>Sport: </TextLabel>
                {errors.sport && <TextError>{errors.sport.message}</TextError>}
                <Controller
                    control={control}
                    rules={{
                        required: "Le sport est obligatoire"
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <RNPickerSelect
                            onValueChange={onChange}
                            items={itemSport}
                            style={{ ...pickerSelectStyles }}
                        />
                    )}
                    name="sport"
                />


                <TextLabel>Niveau: </TextLabel>
                {errors.activityLevel && <TextError>{errors.activityLevel.message}</TextError>}
                <Controller
                    control={control}
                    rules={{
                        required: "Le niveau est obligatoire"
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <RNPickerSelect
                            onValueChange={onChange}
                            items={itemLevel}
                            style={{ ...pickerSelectStyles }}
                        />
                    )}
                    name="activityLevel"
                />

                <TextLabel>Date: </TextLabel>
                {errors.activityDate && <TextError>{errors.activityDate.message}</TextError>}
                <Controller
                    control={control}
                    rules={{
                        required: "La date est obligatoire",
                        maxLength: 10
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <DatePicker style={formStyles.datePickerStyle}
                            onDateChange={onChange}
                            date={date}
                            mode="date"
                            minDate={new Date()}
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    display: 'none'
                                },
                                dateText: {
                                    color: '#F8F8FF',
                                    marginLeft: 10,

                                    alignSelf: 'flex-start'

                                },
                                dateInput: {
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderTopWidth: 0,
                                    elevation: 0,
                                    borderBottomWidth: 0,
                                }

                            }}
                        />
                    )}
                    name="activityDate"
                />

                <TextLabel>Lieu: </TextLabel>
                {errors.address && <TextError>{errors.address.message}</TextError>}
                <Controller
                    control={control}
                    rules={{
                        required: "Le lieu est obligatoire"
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={formStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="address"
                />


                <TextLabel>Nombre de participant maximal: </TextLabel>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={formStyles.input}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="participant"
                />


                <TextLabel>Numéro de téléphone: </TextLabel>
                {errors.contact && <TextError>10 caractères numérics attendus</TextError>}
                <Controller
                    control={control}
                    rules={{
                        maxLength: 10,
                        minLength: 10
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            keyboardType='numeric'
                            style={formStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="contact"
                />

            </View>
            <WrappedView style={{ marginLeft: 64, marginRight: 64 }}>
                {errorMessage === "" ? null : <TextError>{errorMessage}</TextError>}
                <PrimaryButton onPress={handleSubmit(onSubmit)}>
                    {/* <Link to="/signin"> */}
                    <Buttontext>Sauvegarder</Buttontext>
                    {/* </Link> */}
                </PrimaryButton>
            </WrappedView>
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        margin: 16,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'transparent',
        color: '#fff'
    },
});

export default Form; 