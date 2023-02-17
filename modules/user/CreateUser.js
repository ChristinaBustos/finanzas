import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { isEmpty,size } from 'lodash'
import { Image,Input,Button, Icon } from 'react-native-elements'
import Loading from '../../kernel/components/Loading'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {validetionEmail} from '../../kernel/validationEmail'

export default function CreateUser() {
    const payload = {email:"", password:"",repeatPassword:""}
    const auth= getAuth()
    const [show,setShow] = useState(false)
    const [error,setError] = useState(payload)
    const [data,setData] = useState(payload)
    const [showPassword,setShowPassword] = useState(true)
    const [showRepeatPassword,setshowRepeatPassword] = useState(true)

    const changePayload=(e,type) => {
        setData({...data,[type]: e.nativeEvent.text})
    }

    const createUser = () => {
        console.log(data);
        if((isEmpty(data.email) || isEmpty(data.password)|| isEmpty(data.repeatPassword))){
            if(validetionEmail(data.email)){
                if(size(data.password) >= 6){
                    if(data.password == data.repeatPassword){
    
                    }else{
                        setError({email:'',password:'Debe seer igual',repeatPassword:'Debe coincidir con la anterior'})
                    }
                }else{
                    setError({email:'',password:'Se requiere una contraseña por los menos 6 carácteres',repeatPassword:'Se requiere una contraseña por los menos 6 carácteres'})
                }
            }else{
                setError({email:'Debe ser correo Electronico',password:'',repeatPassword:''})
            }       
        }else{
            setError({email:'Campo Obligatorio',password:'Campo Obligatorio',repeatPassword:'Campo Obligatorio'})
        }
    }

  return (
    <KeyboardAwareScrollView>
        <Image
            source={require('../../assets/img/presupuesto.png')}
            resizeMode='contain'
            style={styles.logo}
        />
        <View style={styles.viewForm}>
            <View style={styles.container}>
                <Input 
                    placeholder='Correo Electronico'
                    keyboardType='email-address'
                    rightIcon={
                        <Icon type='material-community' name='email-outline' size={22} />
                    }
                    containerStyle={styles.input}
                    onChange={(e) => changePayload(e,'email')}
                    errorMessage={error.email}
                />

                <Input 
                    placeholder='contraseña'
                    containerStyle={styles.input}
                    rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' :'eye-outline'} size={22} />}
                    onPress={()=> setShowPassword(!ShowPassword)}
                    secureTextEntry={showPassword}
                    onChange={(e)=> changePayload(e,'password')}
                    errorMessage={error.password}
                />
                <Input 
                    placeholder='Repetir contraseña'
                    containerStyle={styles.input}
                    rightIcon={<Icon type='material-community' name={showRepeatPassword ? 'eye-off-outline' :'eye-outline'} size={22} />}
                    onPress={()=> setshowRepeatPassword(!showRepeatPassword)}
                    secureTextEntry={showRepeatPassword}
                    onChange={(e)=> changePayload(e,'password')}
                    errorMessage={error.repeatPassword}
                />
                <Button 
                    title='Crear cuenta'
                    style={styles.btncontainer}
                    buttonStyle={styles.btn}
                    onPress={createUser}
                />

            </View>
        </View>
        <Loading show={show} tect='Registrar Usuario' />
    </KeyboardAwareScrollView>
  )
  
}

const styles = StyleSheet.create({
    logo:{
        width:'100%',
        height:150,
        marginTop:20
    },
    viewForm:{
        marginHorizontal:20
    },
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        marginTop:20
    },
    input:{
        width:'100%',
        marginVertical:10
    },
    btncontainer:{
        marginBottom:20,
        width:'95%'
    },
    btn: {
        backgroundColor:'#28a745'
    }
})