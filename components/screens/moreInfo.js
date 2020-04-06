import React, {useState, useEffect} from "react";

import {View, Text, TouchableOpacity} from "react-native";

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
        <View>
            <View>
                <View>
                    <Text>{todoName}</Text>
                    <Text>{todoDescription}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={modificarTarefa}>
                    <View>
                        <Text>{concluir ? "Concluir tarefa":"Desconcluir tarefa"}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={removerTarefa}>
                    <View>
                        <Text>Remover tarefa</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default moreInfo;