import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as  ImagePicker from 'expo-image-picker'
import { Feather, MaterialCommunityIcons } from "react-native-vector-icons"
import { useNavigation } from '@react-navigation/native';
const MainCamera = () => {
    const [cameraType, setCameraType] = useState(CameraType.back)
    const [hasPermission, setHasPermission] = useState(null);
    const [image, setImage] = useState(null);

    const cameraRef = useRef(null); // Initialize the ref with null
    const navigation = useNavigation()
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setImage(photo.uri); // Here, you can handle the captured photo data
            // navigation.navigate('UserChat', {
            //     imageUrl: photo.uri,
            // })
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }



    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // navigation.navigate('UserChat', {
            //     imageUrl: result.assets[0].uri,
            // })

        }
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                // flashMode={flashMode}
                type={cameraType}
                style={styles.camera}
            >


            </Camera>
            {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View> */}

            <View style={styles.bottomBarContainer}>

                <View>
                    <TouchableOpacity style={styles.galleryButton} onPress={openImagePicker}>
                        <View style={styles.imageOverlay}></View>
                        <MaterialCommunityIcons name="image" size={24} color="white" />
                    </TouchableOpacity>
                </View >

                <View style={styles.recordButtonContainer}>
                    <TouchableOpacity onPress={takePicture} style={styles.buttonRecord}>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.galleryButton}
                        onPress={() => setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)}
                    >
                        <View style={styles.imageOverlay}></View>
                        <Feather name={"refresh-ccw"} size={24} color="white" />
                    </TouchableOpacity>
                </View >
            </View >
        </View >
    );
};

export default MainCamera;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomBarContainer: {
        paddingHorizontal: 30,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    recordButtonContainer: {
        flex: 1,
    },


    buttonRecord: {
        borderWidth: 8,
        borderColor: "hsl(30, 100%, 40%)",
        backgroundColor: '#ff9900',
        width: 70,
        height: 70,
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: 30
    },
    iconText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
    },
    galleryButton: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,
        overflow: 'hidden',
        height: 50,
        width: 50,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    galleryImage: {
        height: 50,
        width: 50,
    },

    imageOverlay: {
        backgroundColor: 'rgba( 0, 0, 0,  .3)',
        ...StyleSheet.absoluteFillObject
    },

    ImageSections: {
        // display: 'flex',
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
});

