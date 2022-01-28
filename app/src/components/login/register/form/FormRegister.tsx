import * as React from 'react'
import {Controller, useForm} from "react-hook-form"
import {Text, View, TextInput, Alert, StyleSheet} from "react-native";
import {Colors} from '../../../../../assets/styles/colors'
import {Buttontext, PrimaryButton, WrappedView} from "../../../../../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import AuthService from '../../../../services/auth.service'
import {useState} from "react";

interface FormData {
    email: string;
    password: string;
}

const FormRegister = () => {
    const navigation = useNavigation()
    const {control, register, handleSubmit, formState: {errors, isSubmitSuccessful}} = useForm<FormData>();

    const onSubmit = (data: any) => {
        AuthService.register(data).then(
            () => {
            navigation.navigate('Signin');
        })
    }

    return (
        <View>
            <View>
                {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}
                <Text style={styles.FormLabel}>Email: </Text>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'L\'email est obligatoire'
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            autoCapitalize="none"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.password && <Text style={styles.textError}>{errors.password.message}</Text>}
                <Text style={styles.FormLabel}>Mot de passe: </Text>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Le mot de passe est obligatoire'
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
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
            <WrappedView style={{marginLeft: 64, marginRight: 64}}>
                <PrimaryButton onPress={handleSubmit(onSubmit)}>
                    <Buttontext>S'inscrire</Buttontext>
                </PrimaryButton>
            </WrappedView>
        </View>
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
    }
})

export default FormRegister;
