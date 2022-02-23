import * as React from 'react'
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from 'react';

export default function HobbiesButton({ dataParentToChild, hobbies, value }) {
    const [imageStyle, setImageStyle] = useState(styles.unselectedImage);

    const onPressButton = (data: any) => {
        console.log("value", value)
        console.log("Hobbies resulte before", hobbies)
        if (hobbies.includes(value)) {
            console.log("Hobbies remove ")
            hobbies = hobbies.filter((hobbie: string) => hobbie !== value)
            setImageStyle(styles.unselectedImage);
        } else {
            hobbies.push(value)
            console.log("Hobbies add ")
            setImageStyle(styles.selectedImage);
        }
        console.log("Hobbies resulte after", hobbies)
    }
    return (
        <TouchableOpacity onPress={onPressButton}>
            <Image style={imageStyle} source={dataParentToChild} />
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create({
    selectedImage: {
        width: 150,
        height: 100,
        margin: 10,
        borderRadius: 6,
    },
    unselectedImage: {
        width: 150,
        height: 100,
        margin: 10,
        borderRadius: 6,
        opacity: 0.33
    },
})

