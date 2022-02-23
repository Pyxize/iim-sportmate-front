import * as React from 'react'
import { Controller, useForm } from "react-hook-form"
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Buttontext, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
import { useNavigation } from "@react-navigation/native";
import { TextError, TextLabel, formStyles } from '../../../../../assets/styles/form';
import { Colors } from '../../../../../assets/styles/colors';
import { validateEmailRegex, validatePasswordRegex } from '../../../../../assets/regex/regex';

interface FormData {
    email: string;
    password: string;
}

export default function FormRegister({ setAuthData, setCurrentPage, setNextTitle }) {
    const navigation = useNavigation()
    const { control, register, handleSubmit, setError, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();

    const onSubmit = (data: any) => {
        if (validateEmail(data.email) && validatePassword(data.password)) {
            console.log("Submit FormAuth with data ", data)
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
                <Text style={styles.FormLabel}>Email: </Text>
                {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'L\'email est obligatoire'
                    }}
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
                <Text style={styles.FormLabel}>Mot de passe: </Text>
                {errors.password && <Text style={styles.textError}>{errors.password.message}</Text>}
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Le mot de passe est obligatoire'
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
                    <Buttontext>Suivant</Buttontext>
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

