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
    text-align:center;
    font-size:15px;
    font-weight:bold;
`;

const CustomInput = styled.TextInput`
    width:200px;
    padding:5px;
    text-align:center;
    border:2px solid ${props=>props.corBorda};
    margin-top:10px;
    margin-bottom:10px;
`;

const CustomButton = styled.TouchableOpacity`
    width:100px;
    height:40px;
    border:1px solid ${props=>props.corBorda};
    background-color:${props=>props.corFundo};
    margin-top:10px;
    align-items:center;
    justify-content:center;
`;

const CustomTextButton = styled.Text`
    font-size:15px;
    font-weight:bold;
    color:#000;
`;

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const logar = () => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .catch((error)=>alert(error.code));
    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user)
                navigation.navigate("TelaInicial");
        })
    }, []);
    return(
        <Page>
            <Header>
                <Title>Login</Title>
            </Header>
            <Body>
                <Placeholder>Digite seu email</Placeholder>
                <CustomInput corBorda="green" placeholder="example@domain.com" onChangeText={(t)=>setEmail(t)} />
                <Placeholder>Digite sua senha</Placeholder>
                <CustomInput corBorda="#f00" placeholder="*******" secureTextEntry={true} onChangeText={(t)=>setSenha(t)} />
                <CustomButton corBorda="#000" corFundo="#ff0" onPress={logar}>
                    <CustomTextButton>Login</CustomTextButton>
                </CustomButton>
            </Body>
        </Page>
    )
}

export default Login;