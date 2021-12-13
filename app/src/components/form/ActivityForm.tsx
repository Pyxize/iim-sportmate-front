import { Controller, useForm } from "react-hook-form"
 import { Text, View, TextInput, Button, Alert, StyleSheet, Pressable } from "react-native";
 import { Colors } from '../../../assets/styles/colors'
 import { Buttontext, PrimaryButton, StyledContainer, WrappedView } from "../../../assets/styles/styles";
 import React, { useState, useRef } from 'react';
 import DatePicker from 'react-native-datepicker';
 import RNPickerSelect from "react-native-picker-select";
 import axios from 'axios';

 type FormData = {
     activityName: string;
     description: string;
     sport: string;
     activityLevel: string;
     activityDate: string;
     address: string;
     participant: string;
     contact: string;
 }

 const Form = () => {
     const { control, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();
     const onSubmit = (data: any) => {
         const headers = {
             'Content-Type': 'application/json',
             'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVrSldUIiwic3ViIjoic3lsdmllQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE2MzkzMzAyODAsImV4cCI6MTYzOTMzMDg4MH0.OSxpBaIbIo_bwx0KUCWfP7H-uporc5tcHhXSOtywTVhag-m2dUenlSSW8zI8V7AUnb6SBeGEUNJKUkd3yejytg`
         };

         console.log(data);
         axios.post(`https://sportmate-develop.herokuapp.com/api/activity`, data, {
             headers: headers
           })
              .then(res => {
                 console.log(res);
                 console.log(res.data);
             })
     }
     const [date, setDate] = useState(new Date());
     const [itemLevel, setItemLevel] = useState([
         { label: 'Débutant', value: 'Débutant' },
         { label: 'Intérmediaire', value: 'Intérmediaire' },
         { label: 'Expert', value: 'expert' }
     ]);
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
                     name="activityName"
                 />

                 <Text style={styles.FormLabel}>Description: </Text>
                 <Controller
                     control={control}
                     rules={{
                         required: false
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
                         required: true
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
                 {errors.sport && <Text style={styles.error}>Le sport est obligatoire</Text>}


                 <Text style={styles.FormLabel}>Niveau: </Text>
                 <Controller
                     control={control}
                     rules={{
                         required: true
                     }}
                     render={({ field: { onChange, onBlur, value } }) => (
                         <RNPickerSelect
                             onValueChange={onChange}
                             items={itemLevel}
                             style={{ ...pickerSelectStyles }}
                         />
                     )}
                     name="activityLevel"
                 />
                 {errors.activityLevel && <Text style={styles.error}>Le niveau est obligatoire</Text>}

                 <Text style={styles.FormLabel}>Date: </Text>
                 <Controller
                     control={control}
                     rules={{
                         required: true,
                         maxLength: 10
                     }}
                     render={({ field: { onChange, onBlur, value } }) => (
                         <DatePicker style={styles.datePickerStyle}
                             onDateChange={onChange}
                             date={date}
                             mode="date"
                             minDate={new Date()}
                             format="YYYY-MM-DD"
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
                         />
                     )}
                     name="activityDate"
                 />
                 {errors.activityDate && <Text style={styles.error}>La date est obligatoire</Text>}

                 <Text style={styles.FormLabel}>Lieu: </Text>
                 <Controller
                     control={control}
                     rules={{
                         required: true
                     }}
                     render={({ field: { onChange, onBlur, value } }) => (
                         <TextInput
                             style={styles.input}
                             onBlur={onBlur}
                             onChangeText={onChange}
                             value={value}
                         />
                     )}
                     name="address"
                 />
                 {errors.address && <Text style={styles.error}>Le lieu est obligatoire</Text>}


                 <Text style={styles.FormLabel}>Nombre de participant maximal: </Text>
                 <Controller
                     control={control}
                     rules={{
                         required: false
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
                     name="participant"
                 />


                 <Text style={styles.FormLabel}>Numéro de téléphone: </Text>
                 <Controller
                     control={control}
                     rules={{
                         required: false,
                         maxLength: 10,
                         minLength: 10
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
                 {errors.contact && <Text style={styles.error}>10 caractères numérics attendus</Text>}

             </View>
             <WrappedView style={{ marginLeft: 64, marginRight: 64 }}>
                 <PrimaryButton onPress={handleSubmit(onSubmit)}>
                     {/* <Link to="/signin"> */}
                     <Buttontext>Sauvegarder</Buttontext>
                     {/* </Link> */}
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
     error: {
         marginBottom: 16,
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
     }
 });

 const pickerSelectStyles = StyleSheet.create({
     inputIOS: {
         margin: 16,
         height: 40,
         borderWidth: 1,
         borderColor: Colors.primary,
         borderRadius: 8,
         padding: 10,
         backgroundColor: 'transparent',
         color: '#fff'
     },
 });

 export default Form; 