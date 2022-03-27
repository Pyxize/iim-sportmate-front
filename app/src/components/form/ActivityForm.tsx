import { Controller, useForm } from "react-hook-form"
import { View, TextInput, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../../assets/styles/colors'
import { Buttontext, PrimaryButton, WrappedView, PageTitle } from "../../../assets/styles/styles";
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextLabel, TextError, formStyles } from "../../../assets/styles/form";
import { AirbnbRating } from "react-native-ratings";
import { makeid } from "../../../assets/random";

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

const Form = ({ activity }) => {

    const { control, handleSubmit, setValue, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();
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

        if (activity) {
            console.log('MISE A JOUR', activity.id);
            axios.put(`https://sportmate-develop.herokuapp.com/api/activity/${activity.id}`, data, config)
                .then(res => {
                    console.log(res.data);
                    navigation.navigate('Évènement', { saved: 'saved', update: makeid() })
                })
                .catch(error => {
                    console.log("ERREUR lors de l'update de activité: ", error);
                    error = error.toString();
                    if (error.includes('403')) {
                        errorMessage = "Oups vous n'êtes pas autorisé";
                    } else {
                        errorMessage = error;
                    }
                    return errorMessage;
                });
        } else {
            console.log('CREATION OUI');
            axios.post(`https://sportmate-develop.herokuapp.com/api/activity`, data, config)
                .then(res => {
                    console.log(res.data);
                    navigation.navigate('Évènement', { saved: 'saved', update: makeid() })
                })
                .catch(error => {
                    console.log("ERREUR lors de la création de l'activité: ", error);
                    error = error.toString();
                    if (error.includes('403')) {
                        errorMessage = "Oups vous n'êtes pas autorisé";
                    } else {
                        errorMessage = error;
                    }
                    return errorMessage;
                });
        }
    }

    const foundDefaultDate = (activity) => {
        return activity != null ? activity.activityDate : new Date();
    }
    const [date, setDate] = useState(foundDefaultDate(activity));
    const [itemLevel, setItemLevel] = useState([
        { label: 'Débutant', value: 'Débutant' },
        { label: 'Intermédiaire', value: 'Intermédiaire' },
        { label: 'Confirmé', value: 'Confirmé' }
    ]);
    const [itemSport, setItemSport] = useState([]);
    const MEDAL_IMAGE = require('../../../assets/img/medal.png')

    const foundDefaultRating = (activity) => {
        if (activity != null) {
            switch (activity.activityLevel) {
                case 'Débutant':
                    return 1
                case 'Intermédiaire':
                    return 2
                case 'Confirmé':
                    return 3
            }
        }
        return 0;

    }

    const foundDefaultSport = (activity) => {
        if (activity != null) {
            return "Natation";
        }
        return "Course à pied";

    }
    let defaultRating = foundDefaultRating(activity);

    let defaultSport = foundDefaultSport(activity);
    useEffect(() => {
        axios.get(`https://sportmate-develop.herokuapp.com/api/sports`)
            .then(res => {
                console.log(res.data)
                const sports = res.data;
                console.log("Apreè l'appel j'ai tous ces sports ", sports)
                sports.forEach(sport => {
                    itemSport.push({ "label": sport, "value": sport })
                });
            })
            .catch(error => {
                console.log("ERREUR lors de la récupération de tous les sports: ", error);
                return error;
            });

        if (activity != null) {
            console.log('Je met à jour les datas pour le formulaire car en mode update :', activity);
            setValue('activityName', activity.activityName, { shouldValidate: true })
            setValue('description', activity.description, { shouldValidate: true })
            setValue('sport', activity.sport, { shouldValidate: true })
            setValue('activityLevel', activity.activityLevel, { shouldValidate: true })
            setValue('activityDate', activity.activityDate, { shouldValidate: true })
            setValue('address', activity.address, { shouldValidate: true })
            if(activity.participant != null){
                setValue('participant', activity.participant.toString(), { shouldValidate: true })
            }
            setValue('contact', activity.contact, { shouldValidate: true })
            setValue('isEvent', activity.isEvent, { shouldValidate: true })
            // setItemSport(activity.sport)
        }
    }, [activity]);

    return (
        <SafeAreaView>
            <PageTitle>{activity ? 'Modification' : 'Création'} d'évènement</PageTitle>
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

                <View>
                    <TextLabel>Sport: </TextLabel>
                    {errors.sport && <TextError>{errors.sport.message}</TextError>}
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Le sport est obligatoire'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <RNPickerSelect
                                    onValueChange={(sport) => {
                                        onChange(sport);
                                    }}
                                    items={itemSport}
                                    style={{ ...pickerSelectStyles }}
                                    // value={"Vélo"}
                                    // placeholder = {"Vélo"}
                               />
                            )}
                             name="sport"
                        />

                        <Controller
                            control={control}
                            rules={{
                                required: 'Le niveau est obligatoire'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <AirbnbRating
                                    starImage={MEDAL_IMAGE}
                                    onFinishRating={(rating) => {
                                        switch (rating) {
                                            case 1:
                                                onChange('Débutant')
                                                break
                                            case 2:
                                                onChange('Intermédiaire')
                                                break
                                            case 3:
                                                onChange('Confirmé')
                                                break
                                        }
                                    }}
                                    showRating={false}
                                    count={3}
                                    size={20}
                                    selectedColor={Colors.primary}
                                    defaultRating={defaultRating}
                                />
                            )}
                            name="activityLevel"
                        />
                    </View>
                </View>

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
                            onDateChange={(newDate) => {
                                setDate(newDate);
                                onChange(newDate.split('-').reverse().join('-'));
                            }}
                            date={date}
                            mode="date"
                            minDate={new Date()}
                            format="DD-MM-YYYY"
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
                        minLength: 10,
                        required: 'Le numéro de téléphone est obligatoire.'
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
