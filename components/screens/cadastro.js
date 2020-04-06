import React, {useState, useEffect} from 'react';

import {View, Text, TouchableOpacity, TextInput} from 'react-native';

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
        <View>  
            <View>
                <Text>Cadastro de usuário</Text>
            </View>
            <View>
                <Text>Digite seu nome</Text>
                <TextInput placeholder="Nome" onChangeText={(t)=>setName(t)} />
                <Text>Digite seu username</Text>
                <TextInput placeholder="Username" onChangeText={(t)=>setUsername(t)} />
                <Text>Digite seu email</Text> 
                <TextInput placeholder="Email" onChangeText={(t)=>setEmail(t)} />
                <Text>Digite sua senha</Text>
                <TextInput placeholder="Senha" onChangeText={(t)=>setPassword(t)} secureTextEntry={true} />
            </View>
            <View>
                <TouchableOpacity onPress={cadastrar}>
                    <View>
                        <Text>Cadastrar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View> 
    )
}

export default Cadastro;