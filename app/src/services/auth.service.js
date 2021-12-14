import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createNavigationContainerRef, NavigationProp, useNavigation} from "@react-navigation/native";
import {useCallback} from "react";
import {Alert} from "react-native";
import {Logo} from "../../assets/styles/styles";
import {resolvePath} from "react-router-native";

//interface Props extends NavigationProp<any> {}

/*
const getAccessToken = async () => {
    let token = await AsyncStorage.getItem('token');
    return token;
}

const getUser = async () => {
    let user = await AsyncStorage.getItem('user')
}
 */


const SetValue = async (user) => {
    try{
        const user = await AsyncStorage.setItem('user', user)
        console.log('value', user)
        return true
    } catch (e){
        console.log('ERROR:', e.message)
    }
}


const login = async (email, password) => {


    const response = await axios.post('https://sportmate-develop.herokuapp.com/api/login',
        email,
        password
    )
    // console.log(typeof JSON.stringify(resp.data))
    if (response.data.token) {
        // const currentToken = JSON.stringify(response.data.token)
        // console.log('currentToken', currentToken)
       // setAccessToken(response.data.token, response.data)
        AsyncStorage.setItem('@user', JSON.stringify(response.data))
        // const user = await getUser()
        // await AsyncStorage.setItem("@token", response.data.token)
        // await AsyncStorage.setItem("@user", JSON.stringify(response.data.email))
        //console.log('aled', (await AsyncStorage.getItem('@user')))
        //  const value = await AsyncStorage.getItem('@token')
        // console.log('token', value)

        // const currentEmail = JSON.stringify(response.data.email)
        // console.log('currentEmail',  currentEmail)
        //   const valueEmail = await AsyncStorage.getItem('@user')
        //console.log('email : ', valueEmail)
    }

}

const register = async (email, password) => {
    const response = await axios.post('https://sportmate-develop.herokuapp.com/api/signin',
        email,
        password
    )
}

const setAccessToken = (token, user) => {
      AsyncStorage.setItem('@token', token)
      AsyncStorage.setItem('@user', JSON.stringify(user))
}

const logout = () => {
    AsyncStorage.removeItem("user");
};

const getToken = async () => {
    const token = await AsyncStorage.getItem("@token")
    return token
}
const getUser = () => {
    const user = AsyncStorage.getItem("@user");
    console.log('getUSer', user)
    return JSON.parse(user)
    //return a
}


export default {
    login,
    register,
    logout,
    getUser
}
