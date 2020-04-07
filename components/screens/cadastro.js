import React, {useState, useEffect} from 'react';

import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

import firebase from "../firebaseConnection";

const Cadastro = ({navigation}) => {
    //states
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cadastrar = () => {
        //Coloco o listener do firebase
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                //Salvo no firebase
                let uid = user.uid;
                firebase.database().ref("users").child(uid).set({
                    name:name,
                    username:username
                })
                navigation.navigate("Await");
            }
        })

        //Crio o user
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error)=>{
            alert(error);
        })
        
    }
    return(
        <View style={e.body}>  
            <View>
                <Text style={e.titulo}>Cadastro de usuário</Text>
            </View>
            <View>
                <Text style={e.dica}>Digite seu nome</Text>
                <TextInput style={[e.input, {borderColor:"#FF00FF"}]} placeholder="Nome" onChangeText={(t)=>setName(t)} />
                <Text style={e.dica}>Digite seu username</Text>
                <TextInput style={[e.input, {borderColor:"#5FB404"}]} placeholder="Username" onChangeText={(t)=>setUsername(t)} />
                <Text style={e.dica}>Digite seu email</Text> 
                <TextInput style={[e.input, {borderColor:"#0000FF"}]} placeholder="Email" onChangeText={(t)=>setEmail(t)} />
                <Text style={e.dica}>Digite sua senha</Text>
                <TextInput style={[e.input, {borderColor:"#FF0000"}]} placeholder="Senha" onChangeText={(t)=>setPassword(t)} secureTextEntry={true} />
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={cadastrar}>
                    <View style={e.button}>
                        <Text style={e.textButton}>Cadastrar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Home");
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
        backgroundColor:"#0000FF",
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

export default Cadastro;