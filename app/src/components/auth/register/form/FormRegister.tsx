import * as React from 'react'
import { Controller, useForm } from "react-hook-form"
import { View, TextInput } from "react-native";
import { Buttontext, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
import { validateEmailRegex, validatePasswordRegex } from '../../../../../assets/regex/regex';
import { TextError, TextLabel, formStyles} from '../../../../../assets/styles/form';

interface FormData {
    email: string;
    password: string;
}

export default function FormRegister({ setAuthData, setCurrentPage, setNextTitle }) {
    const { control, handleSubmit, setError, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: any) => {
        let isValid = true
        if (!validateEmail(data.email)) {
            isValid = false;
        }
        if(!validatePassword(data.password)){
            isValid = false;
        }
        if(isValid){
            setAuthData(data);
            setCurrentPage(1)
            setNextTitle("Sport pratiqués")
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

    const validatePassword = (value: any) => {
        if (!validatePasswordRegex(value)) {
            setError("password", {
                message: "8 caractères minimum attendu avec une majuscule, une minuscule, un chiffre et un caractère spécial",
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
                    render={({ field: { onChange, onBlur, value } }) => (
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
                    render={({ field: { onChange, onBlur, value } }) => (
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
            <WrappedView style={formStyles.wrappedView}>
                <PrimaryButton onPress={handleSubmit(onSubmit)}>
                    <Buttontext>Suivant</Buttontext>
                </PrimaryButton>
            </WrappedView>
        </View>
    );
}