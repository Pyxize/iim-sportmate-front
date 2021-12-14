import styled from 'styled-components'
import {View, Image, SafeAreaView, Pressable} from "react-native"
import {Colors} from './colors'

export const SafeAreaWrapped = styled.SafeAreaView`
  background-color: ${props => props.background || "transparent"};
  flex: 1;
  flex-direction: column;
`

export const StyledContainer = styled.View`
  flex: 1;
  justify-content: ${props => props.justifyContent || "space-around"};;
  margin-left: 16px;
  margin-right: 16px;
`

export const WrappedView = styled.View`
  align-items: center;
  justify-content: center;
`


export const Logo = styled.Image`
  width: 250px;
  height: 250px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${Colors.white};
`

export const PrimaryButton = styled.Pressable`
  padding: 10px 48px;
  border-radius: 8px;
  background-color: ${props => props.customBg || "#F67201"};
  border-color: transparent;
`
export const Buttontext = styled.Text`
    color: ${Colors.white};
    font-size: 16px;
`

export const IconBtn = styled.Pressable`
  margin-top: 10px;
  margin-bottom: 10px;
`