import React, { useState } from 'react';
import { Buttontext, IconBtn, PrimaryButton, WrappedView } from '../../../../../assets/styles/styles';
import Ionicons from "@expo/vector-icons/Ionicons"
import SportRegisterComponent from './SportRegisterComponent';
import { useForm } from "react-hook-form"
import { TextError } from '../../../../../assets/styles/form';

type FormData = {
    sports: []
}

let sportsData: { level: string; name: string; }[] = [];

export default function AddSportRegister({ setSportsData, setCurrentPage, setNextTitle }) {
    const { control, register, handleSubmit, setValue, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();

    const [level, setLevel] = useState();
    const [sport, setSport] = useState();

    const [inputList, setInputList] = useState([<SportRegisterComponent setLevel={setLevel} setSport={setSport} />]);

    const onAddBtnClick = () => {
        console.log("onAddBtnClick before", sportsData)
        setInputList(inputList.concat(<SportRegisterComponent setLevel={setLevel} setSport={setSport} />));
        sportsData.push({ "level": level, "name": sport })

        console.log(" onAddBtnClick Submit Sportuser with level ", level)
        console.log(" onAddBtnClick Submit Sportuser with sport ", sport)
        console.log("onAddBtnClick Submit Sportuser with sportsData", sportsData)
    };

    const onSubmit = (data: any) => {
        if (data.sport != undefined) {
            sportsData.push({ "level": level, "name": sport })
        }
        console.log("onSubmit Submit Sportuser with sportsData", sportsData)

        setSportsData(sportsData)
        setCurrentPage(2)
        setNextTitle("Données personnelles")
    }

    return (
        <WrappedView>
            {inputList}
            {(sport != undefined && level == undefined) ? <TextError>Veuillez séléctionner un niveau</TextError> : null}
            <IconBtn onPress={onAddBtnClick}>
                <Ionicons name='add-circle' size={40} color='#F67201'></Ionicons>
            </IconBtn>

            {(sport != undefined && level == undefined) ? null
                :
                <PrimaryButton onPress={handleSubmit(onSubmit)}>
                    <Buttontext>Suivant</Buttontext>
                </PrimaryButton>}

        </WrappedView>
    );
};