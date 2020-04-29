import React, {useState, useEffect} from "react";

import styled from "styled-components/native";

import firebase from "../shared/firebaseConnection";

const Page = styled.SafeAreaView`
    flex:1;
    align-items:center;
`;

const Header = styled.View`
    width:100%;
    height:60px;
    background-color:#CCC;
    align-items:center;
    flex-direction:row;
`;

const CustomButtom = styled.TouchableOpacity`
    width:100px;
    height:40px;
    margin-right:10px;
    background-color:${props=>props.corFundo};
    border:1px solid ${props=>props.corBorda};
    align-items:center;
    justify-content:center;
`;

const CustomText = styled.Text`
    font-size:${props=>props.letra}px;
    flex:1;
    margin-left:10px;
    font-weight:bold;
`;

const TextButton = styled.Text`
    font-size:15px;
    font-weight:600;
    color:#FFFFFF;
`;

const TelaInicial = ({navigation}) => {
    const [uid, setUid] = useState(0);
    const [nome, setNome] = useState("");
    useEffect(()=>{
        let user = firebase.auth().currentUser;
        let token = user.uid;
        setUid(token);
        firebase.database().ref("users").child(token).once("value").then((snapshot)=>{
            let nome = snapshot.val().nome;
            setNome(nome);
        })
    })
    return(
        <Page>
            <Header>
                <CustomText letra={18}>Bem vindo, {nome}</CustomText>
                <CustomButtom corFundo="#ff0000" corBorda="#000">
                    <TextButton>Logout</TextButton>
                </CustomButtom>
            </Header>
        </Page>
    )
}

export default TelaInicial;