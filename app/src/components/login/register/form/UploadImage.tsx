import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage() {
    const [image, setImage] = useState(null);

    const addImage = async () => {
        console.log("ADD IMAGE");
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("ADD IMAGE JSON");
        console.log(JSON.stringify(_image));

        if (!_image.cancelled) {
            setImage(_image.uri);
        }
    };

    //   useEffect(() => {
    //     checkForCameraRollPermission()
    //   }, []);

    //   const  checkForCameraRollPermission=async()=>{
    //     const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //       alert("Please grant camera roll permissions inside your system's settings");
    //     }else{
    //       console.log('Media Permissions are granted')
    //     }

    //   }


    return (
        <View style={imageUploaderStyles.container}>
            {
                image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
            }
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                    <Text style={imageUploaderStyles.textButton}>{image ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camera" size={15} color="black" />
                </TouchableOpacity>
            </View>
        </View>

    );
}

const imageUploaderStyles = StyleSheet.create({
    container: {
        elevation: 2,
        height: 80,
        width: 80,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
        marginBottom: 30,
        marginLeft: 20,
        marginTop: 16
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 8
    }
})