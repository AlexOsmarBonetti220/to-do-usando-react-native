import React, {useState} from 'react';

import {View, TouchableOpacity, Text, TextInput, StyleSheet} from "react-native";

import firebase from "../firebaseConnection";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const logar = () => {
        //Colocando o listener
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                navigation.navigate("TelaInicial");
            }
        })
        //Logando o usuario
        firebase.auth().signInWithEmailAndPassword(email, senha).catch((error)=>{
            alert(error);
        })
    }
    return(
        <View style={e.body}>
            <View>
                <Text style={e.titulo}>Login</Text>
            </View>
            <View>
                <Text style={e.dica}>Digite seu email</Text>
                <TextInput style={[e.input, {borderColor:"#FF00FF"}]} placeholder="Email" onChangeText={(t)=>setEmail(t)} />
                <Text style={e.dica}>Digite sua senha</Text>
                <TextInput secureTextEntry={true} style={[e.input, {borderColor:"#FF0000"}]} placeholder="Senha" onChangeText={(t)=>setSenha(t)} />
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={logar}>
                    <View style={e.button}>
                        <Text style={e.textButton}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Home');
                }}>
                    <View style={[e.button, {backgroundColor:"#ffff00"}]}>
                        <Text style={[e.textButton, {color:"#000000"}]}>Voltar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const e = StyleSheet.create({
    body:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10
    },
    titulo:{
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center",
    },
    dica:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:"center",
        paddingBottom:15,
        paddingTop:15
    },
    input:{
        width:200,
        height:40,
        padding:5,
        textAlign:"center",
        borderWidth:1,
    },
    button:{
        width:100,
        height:40,
        backgroundColor:"#21610B",
        marginTop:20,
        textAlign:"center",
        justifyContent:"center",
        borderWidth:1,
        borderColor:"#000000",
        marginRight:10
    },
    textButton:{
        fontSize:15,
        fontWeight:"bold",
        textAlign:"center",
        color:"#FFFFFF"
    }
})

export default Login;