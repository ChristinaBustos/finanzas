import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { Input,Button,Image,Icon } from '@rneui/base'
import { isEmpty } from 'lodash';

export default function Login() {
    const [error,setError] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const login =() => {
        console.log(email);
        if(!(isEmpty(email) || isEmpty(password))){
            console.log("Listos para iniciar sesión");
        }else {
            setError('Campo obligatorio');
        }

    }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image 
            source={require("../../../../assets/img/presupuesto.png")}
            resizeMode="contain"
            style={styles.logotype}
        />
        <Input 
            placeholder='Corre Electrónico'
            keyboardType='email-address'
            containerStyle={styles.input}
            onChange={(event)=> setEmail(event.nativeEvent.text)}
            errorMessage={error}
        />

        <Button
         title='Iniciar sesión'
         icon={<Icon type='material-community' name='login' size={22} color='#fff' />}
         onPress={login}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner:{
        backgroundColor: '#fff',
        height:"100%"
    },
    logotype: {
        width: "100%",
        height:150,
        marginTop: 16,
        marginBottom: 16
    }
})