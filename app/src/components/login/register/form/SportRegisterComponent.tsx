import { Controller, useForm } from "react-hook-form"
import { Text, View, StyleSheet } from "react-native";
import React, { useState } from 'react';
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../../assets/styles/colors";
import { Buttontext, IconBtn, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Ionicons from "@expo/vector-icons/Ionicons"

type FormData = {
    sport: string;
    level: string;
}

const SportRegisterComponent = (setData) => {
    const { control, register, handleSubmit, setValue, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();

    setValue('level', 'Débutant')
    
    // const onSubmit = (data: any) => {
    //     console.log("Submit Sportuser with data ", data)
    //     setData(data)
    //     setPage(2)
    //     setTitle("Données personnelles")
    // }

    const [itemSport, setItemSport] = useState([
        { label: 'Course', value: 'Course à pied' },
        { label: 'Natation', value: 'Natation' },
    ]);

    const ratingCompleted = (rating) => {
        switch (rating) {
            case 1:
                setValue('level', 'Débutant')
                break
            case 2:
                setValue('level', 'Intermédiaire')
                break
            case 3:
                setValue('level', 'Confirmé')
                break
        }
    }

    const MEDAL_IMAGE = require('../../../../../assets/img/medal.png')


    return (
        <View>
            <Text style={styles.FormLabel}>Sport: </Text>
            {errors.sport && <Text style={styles.textError}>{errors.sport.message}</Text>}
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <Controller
                    control={control}
                    rules={{
                        required: 'Le sport est obligatoire'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <RNPickerSelect
                            onValueChange={onChange}
                            items={itemSport}
                            style={{ ...pickerSelectStyles }}
                        />
                    )}
                    name="sport"
                />

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <AirbnbRating
                            starImage={MEDAL_IMAGE}
                            onFinishRating={ratingCompleted}
                            showRating={false}
                            count={3}
                            size={20}
                            selectedColor={Colors.primary}
                            defaultRating={1}
                        />
                    )}
                    name="level"
                />
            </View>
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
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        color: Colors.white
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        margin: 16,
        height: 40,
        width: 220,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'transparent',
        color: '#fff'
    },
});

export default SportRegisterComponent;
