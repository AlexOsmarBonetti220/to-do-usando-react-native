import React, {useState, useEffect} from "react";

import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

import firebase from "../firebaseConnection";

const moreInfo = ({route, navigation}) => {
    const [key, setKey] = useState("");
    const [uid, setUid] = useState(0);
    const [concluir, setConcluir] = useState(true);
    const [todoName, setTodoName] = useState("");
    const [todoDescription, setTodoDescription] = useState(""); 
    const modificarTarefa = () => {
        if(concluir)
            firebase.database().ref("todo").child(uid).child(key).child("todoCompleted").set(true);
        else
            firebase.database().ref("todo").child(uid).child(key).child("todoCompleted").set(false);
    }
    const removerTarefa = () => {
        firebase.database().ref("todo").child(uid).child(key).remove();
        navigation.navigate("TelaInicial");
    }

    useEffect(()=>{
        let {key} = route.params; 
        setKey(key);
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                let uid = user.uid;
                setUid(uid);
                firebase.database().ref("todo").child(uid).child(key).on("value", (snapshot)=>{
                    if(snapshot.val() !== undefined && snapshot.val() !== null){
                        let name = snapshot.val().todoName;
                        let description = snapshot.val().todoDescription;
                        if(snapshot.val().todoCompleted)
                            setConcluir(false);
                        else
                            setConcluir(true);
                        setTodoName(name);
                        setTodoDescription(description);
                    }
                }, (error)=>{
                    navigation.navigate("TelaInicial");
                })
            }
        })
    }, [])
    return(
        <View style={e.body}>
            <Text style={e.titulo}>Gerência de tarefas</Text>
            <View style={e.taskPlace}>
                <Text style={[e.subtitulo, {color:"#ff0000"}]}>Nome: {todoName}</Text>
                <View>
                    <Text style={[e.todoDescription, {color:"#ff0000"}]}>Descrição: {todoDescription}</Text>
                </View>
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={modificarTarefa}>
                    <View style={[e.buttons, {backgroundColor:"#21610B"}]}>
                        <Text style={e.textButton}>{concluir ? "Concluir tarefa":"Desconcluir tarefa"}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={removerTarefa}>
                    <View style={[e.buttons, {backgroundColor:"#FF0000"}]}>
                        <Text style={e.textButton}>Remover tarefa</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("AttTarefa", {id:key})
                }}>
                    <View style={[e.buttons, {marginTop:20, backgroundColor:"#0000FF"}]}>
                        <Text style={e.textButton}>Atualizar tarefa</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("TelaInicial");
                }}>
                    <View style={[e.buttons, {marginTop:20, backgroundColor:"#ff00ff"}]}>
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
        alignItems:"center",
        justifyContent:'center',
        padding:10
    },
    titulo:{
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center",
        paddingBottom:20
    },
    subtitulo:{
        fontSize:20,
        fontWeight:"bold",
        paddingBottom:20,
        textAlign:"center"
    },
    todoDescription:{
        fontSize:15,
        fontWeight:"bold",
        textAlign:"center",
        paddingBottom:10
    },
    taskPlace:{
        backgroundColor:'#c6c6c6',
        padding:10,
        textAlign:'center',
        borderWidth:2,
        borderColor:"#000000",
        marginBottom:20
    },
    buttons:{
        width:150,
        height:40,
        borderWidth:2,
        borderColor:"#000000",
        alignItems:"center",
        justifyContent:"center",
        marginRight:10
    },
    textButton:{
        fontSize:15,
        fontWeight:"bold",
        color:'#ffffff'
    }
})

export default moreInfo;