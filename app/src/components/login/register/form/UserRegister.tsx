import { Controller, useForm } from "react-hook-form"
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import { Buttontext, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../../assets/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
    profilepPicture: string;
    firstName: string;
    lastName: string;
    sex: string;
    birthday: string;
    mobile: string;
}

const UserRegister = () => {
    const navigation = useNavigation()
    const { control, register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();

    const onSubmit = (data: any) => {

    }

    const [date, setDate] = useState(new Date());

    return (
        <SafeAreaView>
            <View>
                <View>
                    {errors.profilepPicture && <Text style={styles.textError}>{errors.profilepPicture.message}</Text>}
                    {/* <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/> */}
                    <Text style={styles.FormLabel}>Image Profile: </Text>
                    <Controller
                        name="profilepPicture"
                        control={control}
                        // rules={{
                        //     required: 'L\'email est obligatoire'
                        // }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                autoCapitalize="none"
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    {errors.firstName && <Text style={styles.textError}>{errors.firstName.message}</Text>}
                    <Text style={styles.FormLabel}>Prénom: </Text>
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
                                secureTextEntry={true}
                            />
                        )}
                    />

                    {errors.lastName && <Text style={styles.textError}>{errors.lastName.message}</Text>}
                    <Text style={styles.FormLabel}>Nom: </Text>
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
                                secureTextEntry={true}
                            />
                        )}
                    />

                    {errors.sex && <Text style={styles.textError}>{errors.sex.message}</Text>}
                    <Text style={styles.FormLabel}>Sex: </Text>
                    <Controller
                        name="sex"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={true}
                            />
                        )}
                    />

                    {errors.birthday && <Text style={styles.textError}>{errors.birthday.message}</Text>}
                    <Text style={styles.FormLabel}>Date da naissance: </Text>
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

                    {errors.mobile && <Text style={styles.textError}>{errors.mobile.message}</Text>}
                    <Text style={styles.FormLabel}>Téléphone: </Text>
                    <Controller
                        name="mobile"
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
                                secureTextEntry={true}
                            />
                        )}
                    />
                </View>
                <WrappedView style={{ marginLeft: 64, marginRight: 64 }}>
                    <PrimaryButton onPress={handleSubmit(onSubmit)}>
                        <Buttontext>S'inscrire</Buttontext>
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
        marginLeft: 16,
        marginBottom: 16,
        color: '#eb4d4b',
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
    // avatar: {
    //     width: 130,
    //     height: 130,
    //     borderRadius: 63,
    //     borderWidth: 4,
    //     borderColor: "white",
    //     marginBottom:10,
    //     alignSelf:'center',
    //     position: 'absolute',
    //     marginTop:130
    //   },
})

export default UserRegister;
