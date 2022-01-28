import * as React from 'react'
import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form"
import {Text, View, TextInput, Button, Alert, StyleSheet, Pressable} from "react-native";
import {Colors} from '../../../../assets/styles/colors'
import {Buttontext, PrimaryButton, StyledContainer, WrappedView} from "../../../../assets/styles/styles";
import {useNavigation} from "@react-navigation/native";
import AuthService from '../../../services/auth.service'
import axios from "axios";

interface FormData {
    email: string;
    password: string;
}
export const signin = async (email, password) => {
    const response = await axios.post('https://sportmate-develop.herokuapp.com/api/login',
        email,
        password
    )
    console.log('form resp', response.data)
}


const Form = () => {
    const navigation = useNavigation()
    const {control, register, handleSubmit, formState: {errors, isSubmitSuccessful}} = useForm<FormData>();


    const onSubmit = (data: any) => {
        signin(data).then(
            () => {
                navigation.navigate('Home')
            }
        )
    }

/*
    const onSubmit = (data: any) => {
        AuthService.login(data).then(
            () => {
                // @ts-ignore
                navigation.navigate('Home');
            }
        )
    }

 */

    return (
        <View>
            <View>
                {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}
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
            <WrappedView>
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

export default Form;

/*
     AuthService.login(data)
         .then(() => {
             if ()
         return navigation.navigate('Home');
     })

       */
/*
const response = await fetch("https://sportmate-develop.herokuapp.com/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: data.email,
        password: data.password
    })
})
const resData = await response.json();
console.log(resData)

if (response.status === 200){
    console.log('token', resData.token)
    const setToken =  await AsyncStorage.setItem('token', JSON.stringify(resData.token));
    const getToken = await AsyncStorage.getItem('token')
    console.log('token storage', getToken);
    //navigation.navigate('Home', {getToken, resData})
} else {
    console.log('aled')
}
}


 */
/*
const response = await fetch("https://sportmate-develop.herokuapp.com/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: data.email,
        password: data.password
    })
})
const resData = await response.json();

if (response.status === 200){
   console.log('token', resData.token)
   const setToken =  await AsyncStorage.setItem('token', JSON.stringify(resData.token));
   const getToken = await AsyncStorage.getItem('token')
   console.log('token storage', getToken);
   navigation.navigate('Home', {getToken, resData})
} else {
   console.log('aled')
}
}

 */

/*
const onSubmit: SubmitHandler<FormData> = (data: any) => {

    const response = axios.post('https://sportmate-develop.herokuapp.com/api/login',
       data
    )
        .then((response) => {
            if (response.data.token){
                const value =  AsyncStorage.setItem("user", JSON.stringify(response.data));
            }
            navigation.navigate('Home')
            console.log(response.data, "server data")
        })
        .catch((error) => {
            console.log(error)
        })
}
 */