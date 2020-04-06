import React, {useEffect} from "react";

import {View, Text} from 'react-native';

import firebase from '../firebaseConnection';

const Await = ({navigation}) => {
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                navigation.navigate("TelaInicial");
            }else{
                navigation.navigate("Home");
            }
        })
    })
    return(
        <View>
            <Text>Loading...</Text>
        </View>
    )
}

export default Await;