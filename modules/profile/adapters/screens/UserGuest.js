import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { Image,Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <ScrollView style={styles.mx} centerContent={true}>
            <Image source={require("../../../../assets/img/presupuesto.png")}
                resizeMode="contain"
                style={styles.img}/>
                <Text style={styles.title}>Bienvenido a MiCochino</Text>
                 <Text style={styles.description}>¿Te gustaria ahorrar dinero? Nosotros te ayudamos, crea o inicia
                    sesión en nuestra aplicación y descubre la mejor manera de ahorrar dinero
                 </Text>
                 <View style={styles.ViewBtnContainer} >
                    <Button 
                        title="Iniciar Sesión"
                        icon = {{
                            name: 'login',
                            type: 'material-community',
                            size:15,
                            color: 'white'
                        }}
                        buttonStyle={styles.btn}
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate('loginStack')}  
                            
                    />
                 </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgorundColor: '#fff',
        height: "100%"
    },
    mx:{
        marginLeft: 32,
        marginRight: 32
    },
    img:{
        width: "100%",
        height: 150
    },
    title:{
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 16
    },
    description:{
        textAlign: "center",
        marginBottom: 16
    },
    ViewBtnContainer: {
        flex: 1,
        alignItems: 'center'
    },
    btn:{
        backgroundColor: 'tomato',
        color: '#fff',
    },
    btnContainer:{
        width: "70%"
    },
    
})