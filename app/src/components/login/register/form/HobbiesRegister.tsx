import * as React from 'react'
import { Controller, useForm } from "react-hook-form"
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Colors } from '../../../../../assets/styles/colors'
import { Buttontext, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
import { useNavigation } from "@react-navigation/native";
import {
    SelectMultipleButton,
    SelectMultipleGroupButton
} from "react-native-selectmultiple-button";


interface FormData {
    hobbies: [];
}

export default function HobbiesRegister({ setHobbiesData, setCurrentPage, setNextTitle }) {
    const navigation = useNavigation()
    const { control, register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();

    const onSubmit = (data: any) => {
        console.log("Submit FormAuth with data ", data)
        setHobbiesData(data);
        setCurrentPage(4)
        setNextTitle("Fin")
    }

    let multipleSelectedData: []
    let multipleSelectedDataLimited: []

    return (
        <View>
            <View>
                <Text style={styles.FormLabel}>Hobbies: </Text>
                <Controller
                    name="hobbies"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SelectMultipleButton
                            buttonViewStyle={{
                                borderRadius: 10,

                                height: 40
                            }}
                            textStyle={{
                                fontSize: 15
                            }}
                            highLightStyle={{
                                borderColor: "gray",

                                backgroundColor: "transparent",

                                textColor: "gray",

                                textTintColor: "white"
                            }}
                            multiple={true}
                            value={hobbiesChoices}
                        // selected={this.state.multipleSelectedData.includes(interest)}
                        // singleTap={valueTap => this._singleTapMultipleSelectedButtons(interest)}
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

