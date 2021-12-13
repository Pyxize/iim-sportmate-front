import * as React from 'react'
import {Controller, useForm} from "react-hook-form"
import {Text, View, TextInput, Alert, StyleSheet} from "react-native";
import {Colors} from '../../../../../assets/styles/colors'
import {Buttontext, PrimaryButton, WrappedView} from "../../../../../assets/styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

interface FormData {
    email: string;
    password: string;
}

const FormRegister = () => {
    const navigation = useNavigation()
    const {control, register, handleSubmit, formState: {errors, isSubmitSuccessful}} = useForm<FormData>();


    const onSubmit = async (data: any) => {

        let header = {
            "Content-Type": "application/json"
        }
        try {
            const response = await fetch("https://sportmate-develop.herokuapp.com/api/signin", {
                method: "POST",
                headers: header,
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            if (response.ok) {
                const resData = await response.json()
                console.log(resData)
                await AsyncStorage.setItem('token', resData.token)
                let user = await AsyncStorage.getItem('user')
                console.log('user', user)
                if (user){
                    navigation.navigate('Home')
                } else {
                    Alert.alert('Probléme token')
                }
            } else if (!response.ok) {
                Alert.alert('Le compte n\'existe pas')
            }
        } catch (e) {
            console.log('error: ', e)
            throw e;
        }
    }

    console.log('errors', errors)
    return (
        <View>
            <View>
                {errors.email && <Text>{errors.email.message}</Text>}
                <Text style={styles.FormLabel}>email: </Text>
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
                {errors.password && <Text>{errors.password.message}</Text>}
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
                    <Buttontext>Connexion</Buttontext>
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
