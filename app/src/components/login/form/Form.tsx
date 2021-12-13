import * as React from 'react'
import { Controller, useForm } from "react-hook-form"
import {Text, View, TextInput, Button, Alert, StyleSheet, Pressable} from "react-native";
import {Colors} from '../../../../assets/styles/colors'
import {Link} from "react-router-native";
import {Buttontext, PrimaryButton, StyledContainer, WrappedView} from "../../../../assets/styles/styles";


type FormData = {
    email: string;
    password: string;
}

const Form = () => {
    const { control, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();
    const onSubmit = (data: any) => console.log(data);

    return (
        <View>
            <View>
                {isSubmitSuccessful && <Text style={{color: 'green'}}>Merci pour votre inscription !!!</Text>}
                <Text style={styles.FormLabel}>email: </Text>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    )}
                    name="email"
                />

              {errors.email && <Text>Vous devez renter un email</Text>}

              <Text style={styles.FormLabel}>Mot de passe: </Text>
              <Controller
                control={control}
                rules={{
                 required: true,
                 maxLength: 10
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
            </View>
            <WrappedView style={{marginLeft: 64, marginRight: 64}}>
                <PrimaryButton onPress={handleSubmit(onSubmit)}>
                    <Link to="/register">
                        <Buttontext>Connexion</Buttontext>
                    </Link>
                </PrimaryButton>
            </WrappedView>
        </View>
      );

}
const styles = StyleSheet.create({
    FormLabel:{
        marginLeft: 16,
        color: '#fff',
    },
    input: {
        margin: 16,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10
    },
    btn_bg:{
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
