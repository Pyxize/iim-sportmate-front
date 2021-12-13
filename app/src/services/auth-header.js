import AsyncStorage from '@react-native-async-storage/async-storage';

export default function authHeader() {
    const user = JSON.parse(AsyncStorage.getItem('@user'));

    console.log('user', user)
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}
