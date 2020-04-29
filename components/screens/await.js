import React, {useEffect} from "react";

import styled from "styled-components/native";

import firebase from "../shared/firebaseConnection";

const Page = styled.SafeAreaView`
    flex:1;
    align-items:center;
    justify-content:center;
`;

const TextAlert = styled.Text`
    font-size:25px;
    text-align:center;
    font-weight:bold;
`;

const Await = ({navigation}) => {
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            user ? navigation.navigate("TelaInicial") : navigation.navigate("TelaInicialCadastro");
        })
    }, []);
    return(
        <Page>
            <TextAlert>Verificando login...</TextAlert>
        </Page>
    )
}   

export default Await;