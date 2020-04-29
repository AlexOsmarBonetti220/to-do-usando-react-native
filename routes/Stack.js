import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

import Login from "../components/screens/login";
import Cadastro from '../components/screens/cadastro';
import Await from "../components/screens/await";
import TelaInicial from "../components/screens/telaInicial";
import TelaInicialCadastro from '../components/screens/telaInicialCadastro';

const StackRoute = () => {
    return(
        <Stack.Navigator initialRouteName="Await">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Await" component={Await} />
            <Stack.Screen name='TelaInicial' component={TelaInicial} />
            <Stack.Screen name="TelaInicialCadastro" component={TelaInicialCadastro} />
        </Stack.Navigator>
    )
}

export default StackRoute;