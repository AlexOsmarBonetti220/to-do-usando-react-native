import React, {useEffect} from "react";

import {View, Text, StyleSheet, Image} from 'react-native';

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
        <View style={e.body}>
            <Image source={require('../img/logo.png')} />
            <Text style={e.loading}>Loading...</Text>
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
    loading:{
        textAlign:"center",
        fontSize:30,
        fontWeight:"bold",
        paddingTop:20
    }
})

export default Await;