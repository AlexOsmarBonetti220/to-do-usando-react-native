import React from "react";

import {TouchableOpacity, View, Image, Text, StyleSheet} from "react-native";

const Home = ({navigation}) => {
    return(
        <View style={e.body}>
            <View>
                <Image source={require("../img/logo.png")} />
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                    <View style={[e.button, {backgroundColor:"#21610B"}]}>
                        <Text style={[e.textoButton, {color:"#FFFFFF"}]}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Cadastro")}>
                    <View style={[e.button, {backgroundColor:"#0000FF"}]}>
                        <Text style={[e.textoButton, {color:"#FFFFFF"}]}>Cadastro</Text>
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
    button:{
        width:100,
        height:40,
        textAlign:"center",
        justifyContent:"center",
        borderWidth:1,
        borderColor:'#000000',
        marginRight:10
    },
    textoButton:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:15
    }
})

export default Home;