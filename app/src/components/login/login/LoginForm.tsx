import * as React from 'react'
import {Controller, useForm} from "react-hook-form"
import {Text, View, TextInput, StyleSheet} from "react-native";
import {Colors} from '../../../../assets/styles/colors'
import {Buttontext, PrimaryButton, WrappedView} from "../../../../assets/styles/styles";
import {useNavigation} from "@react-navigation/native";
import AuthService from '../../../services/auth.service'
import { validateEmailRegex } from '../../../../assets/regex/regex';

interface FormData {
    email: string;
    password: string;
}


const LoginForm = () => {
    const navigation = useNavigation()
    const {control, register, handleSubmit, setError, formState: {errors, isSubmitSuccessful}} = useForm<FormData>();


    const onSubmit = (data: any) => {
        if (validateEmail(data.email)) {
            AuthService.login(data).then(
                () => {
                    // @ts-ignore
                    navigation.navigate('Home');
                }
            )
        }
    }

    const validateEmail = (value: any) => {
        if (!validateEmailRegex(value)) {
            setError("email", {
                message: "Format du mail incorrect",
            });
            return false;
        }
        return true;
    }

    return (
        <View>
            <View>
                <Text style={styles.FormLabel}>Email: </Text>
                {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}
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
                <Text style={styles.FormLabel}>Mot de passe: </Text>
                {errors.password && <Text style={styles.textError}>{errors.password.message}</Text>}
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
    }
})

export default LoginForm;