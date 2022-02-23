import * as React from 'react'
import {Controller, useForm} from "react-hook-form"
import {View, TextInput} from "react-native";
import {Buttontext, PrimaryButton, WrappedView} from "../../../../assets/styles/styles";
import {useNavigation} from "@react-navigation/native";
import AuthService from '../../../services/auth.service'
import { validateEmailRegex } from '../../../../assets/regex/regex';
import { TextError, TextLabel, formStyles } from '../../../../assets/styles/form';

interface FormData {
    email: string;
    password: string;
}


const LoginForm = () => {
    const navigation = useNavigation()
    const {control, handleSubmit, setError, formState: {errors}} = useForm<FormData>();


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
                <TextLabel>Email: </TextLabel>
                {errors.email && <TextError>{errors.email.message}</TextError>}
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'L\'email est obligatoire'
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            autoCapitalize="none"
                            style={formStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <TextLabel>Mot de passe: </TextLabel>
                {errors.password && <TextError>{errors.password.message}</TextError>}
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Le mot de passe est obligatoire'
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={formStyles.input}
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

export default LoginForm;