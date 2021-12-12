
import { Controller, useForm } from "react-hook-form"
import {Text, View, TextInput, Button, Alert, StyleSheet, Pressable} from "react-native";
import {Colors} from '../../../assets/styles/colors'
import {Link} from "react-router-native";
import {Buttontext, PrimaryButton, StyledContainer, WrappedView} from "../../../assets/styles/styles";
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
    const [open, setOpen] = useState(false);
    const [valueLevel, setValueLeve] = useState(null);
    const [itemLevel, setItemLevel] = useState([
      {label: 'Débutant', value: 'Débutant'},
      {label: 'Intérmediaire', value: 'Intérmediaire'},
      {label: 'Expert', value: 'expert'}
    ]);

    
    return (
        <View>
            <View>
                {isSubmitSuccessful && <Text style={{color: 'green'}}>Evènement bien créé !!!</Text>}
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
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
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
                    open={open}
                    value={valueLevel}
                    items={itemLevel}
                    setOpen={setOpen}
                    setValue={setValueLeve}
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
          date={activityDate} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
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
            <WrappedView style={{marginLeft: 64, marginRight: 64}}>
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
        width: 200,
        marginTop: 20,
      }
});
export default Form;