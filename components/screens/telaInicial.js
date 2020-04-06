import React, { useState, useEffect } from 'react';

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import firebase from "../firebaseConnection";

const TelaInicial = ({ navigation }) => {
    let [tarefas, setTarefas] = useState([]);
    let [tarefasC, setTarefasC] = useState([]);
    const [username, setUsername] = useState("");
    const [possuiT, setPossuiT] = useState("");
    const [possuiTC, setPossuiTC] = useState("");
    const [uid, setUid] = useState(0);
    const [load, setLoad] = useState(false);
    const sair = () => {
        firebase.auth().signOut();
        navigation.navigate("Await");
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
                setUid(uid);
                firebase.database().ref("todo").child(uid).on("value", (snapshot) => {
                    tarefas = [];
                    tarefasC = [];
                    snapshot.forEach((child) => {
                        if (!child.val().todoCompleted) {
                            tarefas.push({
                                key: child.key,
                                todoName: child.val().todoName,
                                todoDescription: child.val().todoDescription,
                                todoCompleted: child.val().todoCompleted,
                            })
                        } else {
                            tarefasC.push({
                                key: child.key,
                                todoName: child.val().todoName,
                                todoDescription: child.val().todoDescription,
                                todoCompleted: child.val().todoCompleted,
                            })
                        }
                    })
                    setLoad(true);
                    setTarefas([...tarefas, tarefas]);
                    if(tarefas.length === 0)
                        setPossuiT("Você não possui tarefas concluídas");
                    else
                        setPossuiT("");
                    setTarefasC([...tarefasC, setTarefasC]);
                    if(tarefasC.length === 0)
                        setPossuiTC("Você não possui tarefas pendentes");
                    else
                        setPossuiTC("");
                })
                firebase.database().ref("users").child(uid).on("value", (snapshot)=>{
                    let username = snapshot.val().nome;
                    setUsername(username);
                })
            }
        })
    }, [])

    if (load) {
        return (
            <View style={e.body}>
                <View style={e.areaButtons}>
                    <Text style={e.username}>User: {username}</Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("AdicionarTarefa");
                    }}>
                        <View style={e.button_is_link}>
                            <Text style={e.font_button}>+ Tarefa</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sair}>
                        <View style={e.button_is_danger}>
                            <Text style={e.font_button}>Sair</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View>
                        <Text style={e.titulo}>TO DO</Text>
                        <Text style={e.subtitulo}>Pressione em uma tarefa para mais informações</Text>
                    </View>
                    <View style={e.info_area}>
                        <Text style={[e.tarefas]}>Tarefas pendentes</Text>
                        <Text>{possuiT}</Text>
                        {tarefas.map((item, i)=>{
                            if(item.key !== undefined){
                                return(
                                    <View key={item.key}>
                                        <TouchableOpacity onPress={()=>{
                                            navigation.navigate("MoreInfo", {key:item.key});
                                        }}>
                                            <Text style={e.todoTask}>{item.todoName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }else
                                return null;
                        })}
                    </View>
                    <View style={e.info_area}>
                        <Text style={[e.tarefas, {paddingTop:20}]}>Tarefas concluídas</Text>
                        <Text>{possuiTC}</Text>
                        {tarefasC.map((item, i)=>{
                            if(item.key !== undefined){
                                return(
                                    <View key={item.key}>
                                        <TouchableOpacity onPress={()=>{
                                            navigation.navigate("MoreInfo", {key:item.key});
                                        }}>
                                            <Text style={e.todoTask}>{item.todoName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        })}
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
}

const e = StyleSheet.create({
    body:{
        flex:1,
        alignItems:"center",
        padding:10
    },
    titulo:{
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center",
        paddingBottom:20,
        paddingTop:20
    },
    subtitulo:{
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center",
        paddingBottom:20
    },  
    areaButtons:{
        flexDirection:"row",
    },
    button_is_danger:{
        width:100,
        height:40,
        backgroundColor:"#FF0000",
        borderWidth:1,
        borderColor:"#000000",
        marginLeft:20,
        alignItems:"center",
        justifyContent:"center"
    },
    button_is_link:{
        width:100,
        height:40,
        backgroundColor:"#0000FF",
        borderWidth:1,
        borderColor:"#000000",
        alignItems:"center",
        justifyContent:"center"
    },
    font_button:{
        fontSize:16,
        fontWeight:"bold",
        color:"#FFFFFF"
    },
    info_area:{
        justifyContent:'center',
        alignItems:"center"
    },
    tarefas:{
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center",
    },
    todoTask:{
        backgroundColor:"#C6C6C6",
        color:"#FF0000",
        marginBottom:5,
        width:200,
        textAlign:"center",
        padding:5,
        fontSize:15
    },
    username:{
        marginLeft:-5,
        marginRight:10,
        textAlign:"center",
        fontSize:15,
        fontWeight:"bold",
        paddingTop:5
    }
})

export default TelaInicial;