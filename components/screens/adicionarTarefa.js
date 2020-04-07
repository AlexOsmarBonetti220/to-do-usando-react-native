import React, {useState, useEffect} from "react";

import {Text, View, TextInput, TouchableOpacity, StyleSheet} from "react-native";

import firebase from "../firebaseConnection";

const AddTarefa = ({navigation}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [uid, setUid] = useState(0);
    const adicionarTarefa = () => {
        if(name !== "" && description !== ""){
            let tarefa = firebase.database().ref("todo").child(uid);
            let key = tarefa.push().key;
            tarefa.child(key).set({
                todoName:name,
                todoDescription:description,
                todoCompleted:false
            })
            navigation.navigate("TelaInicial");
        }
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                let uid = user.uid;
                setUid(uid);
            }
        })
    })
    return(
        <View style={e.body}>
            <View>
                <Text style={e.titulo}>Adicione uma nova tarefa</Text>
            </View>
            <View>
                <Text style={e.label}>Digite o nome da tarefa</Text>
                <TextInput style={[e.input, {borderColor:"green"}]} placeholder="Nome" onChangeText={(t)=>setName(t)} />
                <Text style={e.label}>Digite a descrição da tarefa</Text>
                <TextInput style={[e.input, {borderColor:"red"}]} placeholder="Descrição" onChangeText={(t)=>setDescription(t)} />
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={adicionarTarefa}>
                    <View style={e.AddTarefa}>
                        <Text style={e.textButton}>Adicionar tarefa</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("TelaInicial");
                }}>
                    <View style={[e.AddTarefa, {backgroundColor:'#ffff00'}]}>
                        <Text style={e.textButton}>Voltar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const e = StyleSheet.create({
    body:{
        flex:1,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
    },
    titulo:{
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center",
    },
    label:{
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center",
        paddingBottom:20,
        paddingTop:20
    },
    input:{
        width:250,
        height:40,
        textAlign:"center",
        padding:5,
        borderWidth:1,
    },
    AddTarefa:{
        width:120,
        height:40,
        backgroundColor:"#00FF00",
        justifyContent:'center',
        marginTop:20,
        borderWidth:1,
        borderColor:"#000000",
        marginRight:10
    },
    textButton:{
        fontSize:15,
        fontWeight:'bold',
        textAlign:"center"
    }
})

export default AddTarefa;