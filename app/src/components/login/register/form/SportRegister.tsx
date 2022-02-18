// import { Controller, useForm } from "react-hook-form"
// import { Text, View, StyleSheet } from "react-native";
// import React, { useState } from 'react';
// import RNPickerSelect from "react-native-picker-select";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Colors } from "../../../../../assets/styles/colors";
// import { Buttontext, IconBtn, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
// import { Rating, AirbnbRating } from 'react-native-ratings';
// import Ionicons from "@expo/vector-icons/Ionicons"

// type FormData = {
//     sport: string;
//     level: string;
// }

// const SportRegister = () => {
//     const navigation = useNavigation()
//     const { control, register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();

//     const [numberOfSport, setNumberOfSport] = useState(0); 
//     { setNumberOfSport(number => number++)}
//     {Array(numberOfSport).fill("").map((_, id) => <Questionnaire />)}
       
//     const onSubmit = (data: any) => {

//     }

//     const addInputForm = () => {
//         console.log("ajout d'un input")
//     }

    

//     const [itemLevel, setItemLevel] = useState([
//         { label: 'Débutant', value: 'Débutant' },
//         { label: 'Intermédiaire', value: 'Intermédiaire' },
//         { label: 'Confirmé', value: 'Confirmé' }
//     ]);

//     const [itemSport, setItemSport] = useState([
//         { label: 'Course', value: 'Course à pied' },
//         { label: 'Natation', value: 'Natation' },
//     ]);

//     const ratingCompleted = (rating) => {
//         console.log("Rating is: " + rating)
//     }

//     const MEDAL_IMAGE = require('../../../../../assets/img/medal.png')


//     return (
//         <SafeAreaView>
//             <View>
//                 <View>
//                     {errors.sport && <Text style={styles.error}>Le sport est obligatoire</Text>}
//                     <Text style={styles.FormLabel}>Sport: </Text>
//                     <View style={{ flexDirection: 'row', marginLeft: 10 }}>
//                         <Controller
//                             control={control}
//                             rules={{
//                                 required: true
//                             }}
//                             render={({ field: { onChange, onBlur, value } }) => (
//                                 <RNPickerSelect
//                                     onValueChange={onChange}
//                                     items={itemSport}
//                                     style={{ ...pickerSelectStyles }}
//                                 />
//                             )}
//                             name="sport"
//                         />

//                         <Controller
//                             control={control}
//                             rules={{
//                                 required: true
//                             }}
//                             render={({ field: { onChange, onBlur, value } }) => (
//                                 <AirbnbRating
//                                     starImage={MEDAL_IMAGE}
//                                     onFinishRating={ratingCompleted}
//                                     showRating={false}
//                                     count={3}
//                                     size={20}
//                                     selectedColor={Colors.primary}
//                                     defaultRating={1}
//                                 />
//                             )}
//                             name="level"
//                         />
//                     </View>
//                 </View>
//                 <WrappedView style={{ marginLeft: 64, marginRight: 64 }}>
//                     <PrimaryButton onPress={handleSubmit(onSubmit)}>
//                         <Buttontext>S'inscrire</Buttontext>
//                     </PrimaryButton>
//                 </WrappedView>
//                 <WrappedView>
//                     <IconBtn onPress={addInputForm()}>
//                         <Ionicons name='add-circle' size={40} color='#F67201'></Ionicons>
//                     </IconBtn>
//                 </WrappedView>
//             </View>
//         </SafeAreaView>
//     );

// }
// const styles = StyleSheet.create({
//     FormLabel: {
//         marginLeft: 16,
//         color: '#fff',
//     },
//     textError: {
//         marginLeft: 16,
//         marginBottom: 16,
//         color: '#eb4d4b',
//     },
//     input: {
//         height: 40,
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         borderRadius: 8,
//         padding: 10,
//         color: Colors.white
//     },
//     error: {
//         marginBottom: 16,
//         marginLeft: 20,
//         color: Colors.primary,
//         fontWeight: 'bold'
//     },
// })

// const pickerSelectStyles = StyleSheet.create({
//     inputIOS: {
//         margin: 16,
//         height: 40,
//         width: 220,
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         borderRadius: 8,
//         padding: 10,
//         backgroundColor: 'transparent',
//         color: '#fff'
//     },
// });

// export default SportRegister;
