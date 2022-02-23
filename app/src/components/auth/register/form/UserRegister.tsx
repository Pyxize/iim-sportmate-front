import { Controller, useForm } from "react-hook-form"
import { View, TextInput } from "react-native";
import { Buttontext, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import { Colors } from "../../../../../assets/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadImage from "./UploadImage";
import { TextError, TextLabel, formStyles } from "../../../../../assets/styles/form";

type FormData = {
    profilePicture: string;
    firstName: string;
    lastName: string;
    genre: string;
    birthday: string;
    mobilePhone: string;
}


const UserRegister = ({ setUserData, setCurrentPage, setNextTitle }) => {
    const { control, register, handleSubmit, setError, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();

    const onSubmit = (data: any) => {
        console.log("onSubmit KLKKLKL")
        if (validatePhone(data.mobilePhone)) {
            if (data.profilePicture == undefined) {
                data.profilePicture = null;
            }
            if (data.genre == undefined) {
                data.genre = "FEMME";
            }
            console.log("Submit FormUser with data ", data)
            setUserData(data);
            setCurrentPage(3)
            setNextTitle("Centres d'intêrets")
        }
    }

    const validatePhoneRegex = (mobile: string) => {
        var regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return regex.test(mobile);
    }

    const validatePhone = (value: string) => {
        if (!validatePhoneRegex(value)) {
            console.log("Tel non valide")
            setError("mobilePhone", {
                message: "Format du téléphone incorrect",
            });
            return false;
        }
        return true;
    }

    const [sexRadio, setSexRadio] = useState([
        { label: 'Femme', value: 'FEMME' },
        { label: 'Homme', value: 'HOMME' },
    ]);
    const [date, setDate] = useState(new Date());

    return (
        <SafeAreaView>
            <View>
                <View>
                    <TextLabel>Image Profile: </TextLabel>
                    {errors.profilePicture && <TextError>{errors.profilePicture.message}</TextError>}
                    <Controller
                        name="profilePicture"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <UploadImage setImage={onChange} />
                        )}
                    />

                    <TextLabel>Prénom: </TextLabel>
                    {errors.firstName && <TextError>{errors.firstName.message}</TextError>}
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{
                            required: 'Le prénom est obligatoire'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={formStyles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <TextLabel>Nom: </TextLabel>
                    {errors.lastName && <TextError>{errors.lastName.message}</TextError>}
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{
                            required: 'Le nom est obligatoire'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={formStyles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <TextLabel>Genre: </TextLabel>
                    {errors.genre && <TextError>{errors.genre.message}</TextError>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RadioForm style={formStyles.radioForm}
                                radio_props={sexRadio}
                                initial={0}
                                formHorizontal={true}
                                buttonColor={Colors.primary}
                                labelColor={Colors.white}
                                onPress={onChange}
                                selectedButtonColor={Colors.primary}
                                selectedLabelColor={Colors.white}
                                labelStyle={{
                                    paddingRight: 60
                                }}
                            />
                        )}
                        name="genre"
                    />

                    <TextLabel>Date da naissance: </TextLabel>
                    {errors.birthday && <TextError>{errors.birthday.message}</TextError>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <DatePicker style={formStyles.datePickerStyle}
                                onDateChange={onChange}
                                date={date}
                                mode="date"
                                maxDate={new Date()}
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
                        name="birthday"
                    />

                    <TextLabel>Téléphone: </TextLabel>
                    {errors.mobilePhone && <TextError>{errors.mobilePhone.message}</TextError>}
                    <Controller
                        name="mobilePhone"
                        control={control}
                        rules={{
                            required: 'Le numéro de téléphone est obligatoire'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={formStyles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </View>
                <WrappedView style={{ marginLeft: 64, marginRight: 64 }}>
                    <PrimaryButton onPress={handleSubmit(onSubmit)}>
                        <Buttontext>Suivant</Buttontext>
                    </PrimaryButton>
                </WrappedView>
            </View>
        </SafeAreaView>
    );

}

export default UserRegister;
