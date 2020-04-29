import React, {useState, useEffect} from "react";

import styled from 'styled-components/native';

import firebase from "../shared/firebaseConnection";

const Page = styled.SafeAreaView`
    flex:1;
    align-items:center;
    justify-content:center;
`;

const Header = styled.View`
    width:100%;
    height:100px;
    align-items:center;
    justify-content:center;
`;

const Title = styled.Text`
    font-size:25px;
    font-weight:bold;
    text-align:center;
`;

const Body = styled.View`
    align-items:center;
    justify-content:center;
    width:100%;
`;

const Placeholder = styled.Text`
    font-size:15px;
    text-align:center;
    font-weight:bold;
`;

const CustomInput = styled.TextInput`
    border:2px solid ${props=>props.corBorda};
    text-align:center;
    padding:5px;
    margin-top:10px;
    margin-bottom:10px;
    width:200px;
`;

const CustomButton = styled.TouchableOpacity`
    margin-top:10px;
    width:100px;
    height:40px;
    background-color:#ff0;
    border:1px solid #000;
    align-items:center;
    justify-content:center;
`;

const TextCustomButton = styled.Text`
    font-size:15px;
    font-weight:bold;
    color:#000;
`;

const Cadastro = ({navigation}) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const criarConta = () => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .catch((error)=>{
            alert(error.code);
        })
    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                let uid = user.uid;
                firebase.database().ref('users').child(uid).set({
                    nome:nome
                });
                navigation.navigate("TelaInicial");
            }
        })
    }, []);
    return(
        <Page>
            <Header>
                <Title>Cadastro de usuário</Title>
            </Header>
            <Body>
                <Placeholder>Digite seu nome</Placeholder>
                <CustomInput placeholder="John" corBorda="#00f" onChangeText={(t)=>setNome(t)} />
                <Placeholder>Digite seu email</Placeholder>
                <CustomInput placeholder="example@domain.com" corBorda="green" onChangeText={(t)=>setEmail(t)} />
                <Placeholder>Digite a sua senha</Placeholder>
                <CustomInput secureTextEntry={true} placeholder="******" corBorda="#f00" onChangeText={(t)=>setSenha(t)} />
                <CustomButton onPress={criarConta}>
                    <TextCustomButton>Cadastrar</TextCustomButton>
                </CustomButton>
            </Body>
        </Page>
    )
}

export default Cadastro;