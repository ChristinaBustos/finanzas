import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../../../../kernel/components/Loading'
import UserLogged from './UserLogged'
import { useNavigation } from '@react-navigation/native'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

export default function Profile() {
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth,(credencial)=>{
            setUser(credencial)
            !credencial ? setSession(false) : setSession(true)
        })
    }, [])
    if (session == null) return <Loading show={true} text='Cargando'/>
    return session ? (<UserLogged user={user}/>) : (<Login navigation={navigation}/>)
}

const styles = StyleSheet.create({})