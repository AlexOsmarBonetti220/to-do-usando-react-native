import React from "react";

import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

import Cadastro from "../components/screens/cadastro";
import Home from "../components/screens/home";
import Login from "../components/screens/login";
import Await from "../components/screens/await";
import TelaInicial from '../components/screens/telaInicial';
import MoreInfo from "../components/screens/moreInfo";
import AdicionarTarefa from "../components/screens/adicionarTarefa";
import AttTarefa from "../components/screens/attTarefa";

const myStack = () => {
    return(
        <Stack.Navigator initialRouteName="Await" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name="Await" component={Await} />
            <Stack.Screen name="TelaInicial" component={TelaInicial} />
            <Stack.Screen name="MoreInfo" component={MoreInfo} />
            <Stack.Screen name="AdicionarTarefa" component={AdicionarTarefa} />
            <Stack.Screen name="AttTarefa" component={AttTarefa} />
        </Stack.Navigator>
    )
}

export default myStack;