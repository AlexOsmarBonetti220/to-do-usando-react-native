import React, {useState, useEffect} from "react";

import firebase from '../firebaseConnection';

import {View, Text, TouchableOpacity, TextInput, Switch, StyleSheet, Alert} from "react-native";

const attTarefa = ({navigation, route}) => {
    const [key, setKey] = useState("");
    const [uid, setUid] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState("");
    const [trueName, setTrueName] = useState(false);
    const [trueDescription, setTrueDescription] = useState(false);
    const atualizarDados = () => {
        //Verifico os campos ativados ou nao
        if(trueName)
            firebase.database().ref("todo").child(uid).child(key).child("todoName").set(
                newName
            )
        else
            firebase.database().ref("todo").child(uid).child(key).child("todoName").set(
                name
            )
        if(trueDescription)
            firebase.database().ref("todo").child(uid).child(key).child("todoDescription").set(
                newDescription
            )
        else
            firebase.database().ref("todo").child(uid).child(key).child("todoDescription").set(
                description
            )
        navigation.navigate("TelaInicial");
    }
    useEffect(()=>{
        let {id} = route.params;
        setKey(id);
        //Pegando o uid do user
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                let uid = user.uid;
                setUid(uid);
                //Pegando os dados do firebase
                firebase.database().ref("todo").child(uid).child(key).on("value", (snapshot)=>{
                    if(snapshot.val() != null && snapshot.val() != undefined){
                        let name = snapshot.val().todoName;
                        let description = snapshot.val().todoDescription;
                        setName(name);
                        setDescription(description);
                    }
                })
            }
        })
    })
    return( 
        <View style={e.body}>
            <View>
                <Text style={e.titulo}>Tarefa atual</Text>
            </View>
            <View style={e.tarefaArea}>
                <Text style={e.tarefa}>{name}</Text>
                <Text style={e.tarefa}>{description}</Text>
            </View>
            <Text style={e.subtitulo}>Para atualizar um campo, marque a opção sim</Text>
            <View>
                <View style={{flexDirection:"row"}}>
                    <Text style={e.subtitulo}>Novo nome</Text>
                    <Text style={[e.switchLeft, e.subtitulo]}>não</Text>
                    <Switch style={{marginTop:-10}} value={trueName} onValueChange={()=>{
                        if(trueName)
                            setTrueName(false);
                        else
                            setTrueName(true);
                    }} />
                    <Text style={e.subtitulo}>sim</Text>
                </View>
                <View>
                    <TextInput onChangeText={(t)=>setNewName(t)} style={[e.input, {borderColor:"#0000ff"}]} placeholder="Nome" />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={e.subtitulo}>Nova descrição</Text>
                    <Text style={[e.switchLeft, e.subtitulo]}>não</Text>
                    <Switch style={{marginTop:-10}} value={trueDescription} onValueChange={()=>{
                        if(trueDescription)
                            setTrueDescription(false);
                        else
                            setTrueDescription(true);
                    }} />
                    <Text style={e.subtitulo}>sim</Text>
                </View>
                <View>
                    <TextInput onChangeText={(t)=>setNewDescription(t)} style={[e.input, {borderColor:"#ff00ff"}]} placeholder="Descrição" />
                </View>
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={atualizarDados}> 
                    <View style={e.button}>
                        <Text style={e.buttonText}>Atualizar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("TelaInicial");
                }}>
                    <View style={[e.button, {backgroundColor:"#ffff00"}]}>
                        <Text style={[e.buttonText, {color:"#000000"}]}>Voltar</Text>
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
    switchLeft:{
        marginLeft:20,
    },
    input:{
        padding:5,
        textAlign:'center',
        borderWidth:1,
        fontSize:15,
        marginBottom:10,
        height:40
    },
    titulo:{
        fontSize:22,
        fontWeight:"bold",
        textAlign:"center",
        paddingBottom:20
    },
    tarefaArea:{
        backgroundColor:"#c6c6c6",
        padding:10,
        marginBottom:20,
        alignItems:"center",
        justifyContent:"center"
    },
    subtitulo:{
        fontSize:16,
        fontWeight:"bold",
        textAlign:'center',
        paddingBottom:20
    },
    tarefa:{
        fontSize:15,
        fontWeight:"bold",
        color:"#ff0000",
        alignItems:"center",
        paddingBottom:5
    },
    button:{
        width:100,
        height:40,
        marginTop:10,
        backgroundColor:"#21610B",
        borderWidth:1,
        borderColor:'#000000',
        textAlign:"center",
        justifyContent:"center",
        marginRight:10
    },
    buttonText:{
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center",
        color:"#ffffff"
    }
})

export default attTarefa;