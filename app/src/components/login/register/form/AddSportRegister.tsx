import React, { useEffect, useState } from 'react';
import { Buttontext, IconBtn, PrimaryButton, WrappedView } from '../../../../../assets/styles/styles';
import Ionicons from "@expo/vector-icons/Ionicons"
import { Text } from 'react-native';
import SportRegisterComponent from './SportRegisterComponent';
import { Controller, useForm } from "react-hook-form"

type FormData = {
    sports: []
}


export default function AddSportRegister({ setSportsData, setCurrentPage, setNextTitle }) {
    const { control, register, handleSubmit, setValue, formState: { errors, isSubmitSuccessful } } = useForm<FormData>();
    
    const [data, setData] = useState();
    const [title, setTitle] = useState();
    const [page, setPage] = useState();

    const [inputList, setInputList] = useState([<SportRegisterComponent setData={setSportsData} />]);

    const onAddBtnClick = event => {
        setInputList(inputList.concat(<SportRegisterComponent setData={setSportsData}/>));
    };

    const onSubmit = (data: any) => {
        console.log("Submit Sportuser with data ", data)
        setSportsData(data)
        setCurrentPage(2)
        setNextTitle("Données personnelles")
    }
    
    return (
        <WrappedView>
            {inputList}
            <IconBtn onPress={onAddBtnClick}>
                <Ionicons name='add-circle' size={40} color='#F67201'></Ionicons>
            </IconBtn>
            <PrimaryButton onPress={handleSubmit(onSubmit)}>
                <Buttontext>Suivant</Buttontext>
            </PrimaryButton>
        </WrappedView>
    );
};