import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar } from '@rneui/base'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../../kernel/components/Loading'
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage"
import * as Imagepicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function UserLogged(props) {
    const { setReload, user } = props
    console.log('Sesión', user);
    const [show, setShow] = useState(false)
    const removeValue = async () => {
        try {
            setShow(true)
            await AsyncStorage.removeItem('@session')
            setShow(false)
            setReload(true)
        } catch (e) {
            setShow(false)
            console.log('Error - UserLogged(12)', e);
        }
    }



    const uploadImage = async (uri) =>{
        setShow(true);
        const response = await fetch(uri);
        console.log("repuesta",response);
        const {_bodyBlob } = response;
        const storage = getStorage();
        const storageRef = ref(storage,`avatars/${user.uid}`);
        return uploadBytes(storageRef,_bodyBlob);
    }

    const changeAvatar = async () =>{
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA)
        if(resultPermission.permissions.camera.status !== 'denied'){
            let result = await Imagepicker.launchImageLibraryAsync({
                mediaTypes: Imagepicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            });
            if(!result.canceled){
                uploadImage(result.assets[0].uri).then((response) => {
                    console.log("Image actualizada");
                    updateProfile()
                }).catch((err)=>{
                    console.log("error",err);
                })
            }else{
                console.log("No se ha seleccionado una imagen");
            }
        }

    }

    const updateProfile =  () =>{
        const storage = getStorage()
        getDownloadURL(ref(storage,`avatars/${user.uid}`)).then(async(url)=>{
            const response = await setDoc(doc(db, "person", `${user.uid}`), {
                displayName: "",
                photo: url
              });
              console.log("Doc prueba",response);
        }).catch((err)=>{
                setShow(false)
                console.log("error al actualizar perfil",err);
            })
    }



    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Avatar
                    size='xlarge'
                    rounded
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/finanzas-7a5b1.appspot.com/o/avatar%2FmRTZiKPLkERJBQ1I9rPttYzHjOH3.jpg?alt=media&token=bd66125b-8746-43b4-b8a2-000cb0483557' }}
                    containerStyle={styles.avatar}
                >
                    <Avatar.Accessory
                        size={50}
                        onPress={changeAvatar}
                    />
                </Avatar>
                <View>
                    <Text style={styles.displayName}>
                        {user.providerData[0].displayName ? user.providerData[0].displayName : 'Anónimo'}
                    </Text>
                    <Text>
                        {user.providerData[0].email}
                    </Text>
                </View>
            </View>
            <Button
                title='Cerrar sesión'
                buttonStyle={styles.btn}
                onPress={removeValue}
            />
            <Loading show={show} text='Cerrando sesión' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: '#FFF'
    },
    btn: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: 'tomato',
        paddingVertical: 10
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 30
    },
    avatar: {
        marginRight: 16
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 5
    },
})