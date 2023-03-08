import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Renta from '../../modules/renta/adapters/screens/Renta'
const Stack = createNativeStackNavigator()

export default function AboutStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#ff5a60' }
            }}>
            <Stack.Screen
                name='aboutStack'
                options={{ title: 'Acerca de nosotros' }}
                component={Renta}
            />
        </Stack.Navigator>
    )
}