import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

import Login from "../components/screens/login";
import Cadastro from '../components/screens/cadastro';
import Await from "../components/screens/await";

export default StackRoute = () => {
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Await" component={Await} />
    </Stack.Navigator>
}