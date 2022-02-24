import * as React from 'react'
import { useForm } from "react-hook-form"
import { View } from "react-native";
import { Buttontext, PrimaryButton, WrappedView } from "../../../../../assets/styles/styles";
import HobbiesButton from './HobbiesButton';
import { TextLabel } from '../../../../../assets/styles/form';


interface FormData {
    hobbies: [];
}

export default function HobbiesRegister({ setHobbiesData, setCurrentPage, setNextTitle }) {
    const { handleSubmit } = useForm<FormData>();

    const onSubmit = (data: any) => {
        console.log("Submit FormAuth with data ", hobbies)
        setHobbiesData(hobbies);
        setCurrentPage(4)
        setNextTitle("Créer votre compte")
    }

    let hobbies: string[] = [];

    let cuisineImg = require("../../../../../assets/img/hobbies/cuisine.png");
    let cinemaImg = require("../../../../../assets/img/hobbies/cinema.png");
    let livreImg = require("../../../../../assets/img/hobbies/livre.png");
    let musiqueImg = require("../../../../../assets/img/hobbies/musique.png");
    let voitureImg = require("../../../../../assets/img/hobbies/voiture.png");
    let animauxImg = require("../../../../../assets/img/hobbies/animaux.png");

    return (
        <View>
            <View>
                <TextLabel>Hobbies: </TextLabel>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <HobbiesButton dataParentToChild={cuisineImg} hobbies={hobbies} value='Cuisine'></HobbiesButton>
                    <HobbiesButton dataParentToChild={animauxImg} hobbies={hobbies} value='Animaux'></HobbiesButton>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <HobbiesButton dataParentToChild={musiqueImg} hobbies={hobbies} value='Musique'></HobbiesButton>
                    <HobbiesButton dataParentToChild={voitureImg} hobbies={hobbies} value='Voiture'></HobbiesButton>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <HobbiesButton dataParentToChild={livreImg} hobbies={hobbies} value='Livre'></HobbiesButton>
                    <HobbiesButton dataParentToChild={cinemaImg} hobbies={hobbies} value='Cinéma'></HobbiesButton>
                </View>
            </View>
            <WrappedView style={{ marginLeft: 64, marginRight: 64 }}>
                <PrimaryButton onPress={handleSubmit(onSubmit)}>
                    <Buttontext>S'inscrire</Buttontext>
                </PrimaryButton>
            </WrappedView>
        </View>
    );

}

