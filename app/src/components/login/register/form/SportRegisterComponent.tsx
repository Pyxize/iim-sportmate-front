import { Controller, useForm } from "react-hook-form"
import { Text, View, StyleSheet } from "react-native";
import React, { useState } from 'react';
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../../../../assets/styles/colors";
import { AirbnbRating } from 'react-native-ratings';

type FormData = {
    sport: string;
    level: string;
}

const SportRegisterComponent = ({setLevel, setSport}) => {
    const { control, register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();


    // const onSubmit = (data: any) => {
    //     console.log("Submit Sportuser with data ", data)
    //     setData(data)
    //     setPage(2)
    //     setTitle("Données personnelles")
    // }

    const [itemSport, setItemSport] = useState([
        { label: 'Course à pied', value: 'Course à pied' },
        { label: 'Natation', value: 'Natation' },
    ]);

    const ratingCompleted = (rating: any) => {
        switch (rating) {
            case 1:
                setLevel('Débutant')
                break
            case 2:
                setLevel('Intermédiaire')
                break
            case 3:
                setLevel('Confirmé')
                break
        }
    }

    const updateSport = (sport: any) => {
        console.log("je met a jour sport avec ", sport)
        setSport(sport)
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
                            onValueChange={updateSport}
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
