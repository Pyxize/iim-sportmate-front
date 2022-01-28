import React, {useEffect, useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useAuth = ((key, initialValue) => {
    const [user, setUser] = useState(initialValue);
    const [login, setLogin] = useState(false)

    useEffect(() => {
        ;(async () => {
            try {
                const value = await AsyncStorage.getItem(key)
                setUser(JSON.parse(value) || initialValue)
                setLogin(true)
            } catch (error) {
                console.error('useAsyncStorage getItem error:', error)
            }
        })()
    }, [key, initialValue])

    const setAsyncData = async (value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
            setUser(value)
        } catch (error) {
            console.error('useAuth setItem error: ', error)
        }
    }

    return [user, setAsyncData, login]
})


