
import { Controller, useForm } from "react-hook-form"
import { Text, View, TextInput, Button, Alert, StyleSheet, Pressable } from "react-native";
import { Colors } from '../../../assets/styles/colors'
import { Link } from "react-router-native";
import { Buttontext, PrimaryButton, StyledContainer, WrappedView } from "../../../assets/styles/styles";
import PhoneInput from "react-native-phone-number-input";
import React, { useState, useRef } from 'react';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';


type FormData = {
    eventName: string;
    description: string;
    sport: string;
    level: string;
    activityDate: string;
    place: string;
    participantMax: string;
    contact: string;
}

const Form = () => {
    const { control, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();
    const onSubmit = (data: any) => console.log(data);
    const [activityDate, setDate] = useState('09-10-2020');
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const contact = useRef<PhoneInput>(null);
    const [openLevel, setOpenLevel] = useState(false);
    const [openSport, setOpenSport] = useState(false);
    const [valueLevel, setValueLevel] = useState(null);
    const [itemLevel, setItemLevel] = useState([
        { label: 'Débutant', value: 'Débutant' },
        { label: 'Intérmediaire', value: 'Intérmediaire' },
        { label: 'Expert', value: 'expert' }
    ]);
    const [valueSport, setValueSport] = useState(null);
    const [itemSport, setItemSport] = useState([
        { label: 'Course', value: 'Course' },
        { label: 'Natation', value: 'Natation' },
        { label: 'Vélo', value: 'Vélo' }
    ]);


    return (
        <View>
            <View>
                {isSubmitSuccessful && <Text style={{ color: 'green' }}>Evènement bien créé !!!</Text>}
                <Text style={styles.FormLabel}>Nom de l'évènement: </Text>
                <Controller
                    control={control}
                    rules={{
                        required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="eventName"
                />

                <Text style={styles.FormLabel}>Description: </Text>
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
                    name="description"
                />

                <Text style={styles.FormLabel}>Sport: </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        maxLength: 10
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <DropDownPicker
                            style={styles.dropdown}
                            open={openSport}
                            value={valueSport}
                            items={itemSport}
                            setOpen={setOpenSport}
                            setValue={setValueSport}
                            setItems={setItemSport}
                        />
                    )}
                    name="sport"
                />



                <Text style={styles.FormLabel}>Niveau: </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        maxLength: 10
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <DropDownPicker
                            style={styles.dropdown}
                            open={openLevel}
                            value={valueLevel}
                            items={itemLevel}
                            setOpen={setOpenLevel}
                            setValue={setValueLevel}
                            setItems={setItemLevel}
                        />
                    )}
                    name="level"
                />



                <Text style={styles.FormLabel}>Date: </Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        maxLength: 10
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <DatePicker style={styles.datePickerStyle}
                            date={activityDate}
                            mode="date"
                            minDate={new Date()}
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    display: 'none'
                                },
                                dateText: {
                                    color: '#F8F8FF',
marginLeft: 10,

        alignSelf: 'flex-start'
                                
                                },
                                dateInput: {
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderTopWidth: 0,
                                    elevation: 0,
                                    borderBottomWidth: 0,
                                }

                            }}
                            onDateChange={(activityDate) => {
                                setDate(activityDate);
                            }}
                        />
                    )}
                    name="level"
                />





                <Text style={styles.FormLabel}>Lieu: </Text>
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
                    name="place"
                />

                <Text style={styles.FormLabel}>Nombre de participant maximal: </Text>
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
                            keyboardType="numeric"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="participantMax"
                />

                <Text style={styles.FormLabel}>Contact: </Text>
                {/* <PhoneInput
                    ref={contact}
                    defaultValue={value}
                    defaultCode="IN"
                    onChangeFormattedText={(text) => {
                    setValue(text);
                    }}
                    withDarkTheme
                    withShadow
                    autoFocus
                /> */}

                <Controller
                    control={control}
                    rules={{
                        required: false,
                        maxLength: 10
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            keyboardType='numeric'
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="contact"
                />

                {errors.contact && <Text>Vous devez renter un numéro de téléphone portable</Text>}

            </View>
            <WrappedView style={{ marginLeft: 64, marginRight: 64 }}>
                <PrimaryButton onPress={handleSubmit(onSubmit)}>
                    <Link to="/signin">
                        <Buttontext>Sauvegarder</Buttontext>
                    </Link>
                </PrimaryButton>
            </WrappedView>
        </View>
    );

}
const styles = StyleSheet.create({
    FormLabel: {
        marginLeft: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    input: {
        margin: 16,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        color: '#fff',
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
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    datePickerStyle: {
        margin: 16,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        backgroundColor: 'transparent',
        color: '#fff',
    },
    dropdown: {
        marginRight: 16,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'transparent',
        color: '#fff'
    }
});
export default Form;