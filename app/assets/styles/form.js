import styled from 'styled-components'
import {Colors} from './colors'
import {StyleSheet } from "react-native";

export const TextLabel = styled.Text`
    margin-left: 16;
    color: ${Colors.white};
`

export const TextError = styled.Text`
    margin-top: 12;
    margin-left: 20;
    color: ${Colors.primary};
    font-weight: bold;
`

export const formStyles = StyleSheet.create({
    input: {
        margin: 16,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 10,
        color: Colors.white
    },
    wrappedView: {
        marginLeft: 64, 
        marginRight: 64
    },
    datePickerStyle: {
        margin: 16,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        backgroundColor: 'transparent',
        color: '#fff',
    },
    radioForm: {
        marginLeft: 40,
        marginTop: 16,
        marginBottom: 16,
    }
})
