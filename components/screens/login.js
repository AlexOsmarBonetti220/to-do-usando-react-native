import React, {useState} from 'react';

import {View, TouchableOpacity, Text, TextInput} from "react-native";

import firebase from "../firebaseConnection";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const logar = () => {
        //Colocando o listener
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                navigation.navigate("Await");
            }
        })
        //Logando o usuario
        firebase.auth().signInWithEmailAndPassword(email, senha).catch((error)=>{
            alert(error);
        })
    }
    return(
        <View>
            <View>
                <Text>Login</Text>
            </View>
            <View>
                <Text>Digite seu email</Text>
                <TextInput placeholder="Email" onChangeText={(t)=>setEmail(t)} />
                <Text>Digite sua senha</Text>
                <TextInput placeholder="Senha" onChangeText={(t)=>setSenha(t)} />
            </View>
            <View>
                <TouchableOpacity onPress={logar}>
                    <View>
                        <Text>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;