import { Controller, useForm } from "react-hook-form"
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import { Buttontext, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../../assets/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import UploadImage from "./UploadImage";

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
            if(data.profilePicture == undefined) {
                data.profilePicture = null;
            }
            if(data.genre == undefined) {
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
                    <Text style={styles.FormLabel}>Image Profile: </Text>
                    {errors.profilePicture && <Text style={styles.textError}>{errors.profilePicture.message}</Text>}
                    <Controller
                        name="profilePicture"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <UploadImage setImage={onChange} />
                        )}
                    />

                    <Text style={styles.FormLabel}>Prénom: </Text>
                    {errors.firstName && <Text style={styles.textError}>{errors.firstName.message}</Text>}
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{
                            required: 'Le prénom est obligatoire'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.FormLabel}>Nom: </Text>
                    {errors.lastName && <Text style={styles.textError}>{errors.lastName.message}</Text>}
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{
                            required: 'Le nom est obligatoire'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Text style={styles.FormLabel}>Genre: </Text>
                    {errors.genre && <Text style={styles.textError}>{errors.genre.message}</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <RadioForm style={styles.radioForm}
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

                    <Text style={styles.FormLabel}>Date da naissance: </Text>
                    {errors.birthday && <Text style={styles.textError}>{errors.birthday.message}</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <DatePicker style={styles.datePickerStyle}
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
                        name="birthday"
                    />

                    <Text style={styles.FormLabel}>Téléphone: </Text>
                    {errors.mobilePhone && <Text style={styles.textError}>{errors.mobilePhone.message}</Text>}
                    <Controller
                        name="mobilePhone"
                        control={control}
                        rules={{
                            required: 'Le numéro de téléphone est obligatoire'
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
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
const styles = StyleSheet.create({
    FormLabel: {
        marginLeft: 16,
        color: '#fff',
    },
    textError: {
        marginTop: 12,
        marginLeft: 20,
        color: Colors.primary,
        fontWeight: 'bold'
    },
    input: {
        margin: 16,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        color: Colors.white
    },
    btn_bg: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: Colors.primary
    },
    textButton: {
        color: '#fff',
    },
    datePickerStyle: {
        margin: 16,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        backgroundColor: 'transparent',
        color: '#fff',
    },
    radioForm: {
        marginLeft: 40,
        marginTop: 16,
        marginBottom: 16,
    },
})

export default UserRegister;
