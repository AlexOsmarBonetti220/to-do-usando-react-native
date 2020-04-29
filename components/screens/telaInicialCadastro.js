import React from "react";
import styled from "styled-components/native";

const Page = styled.SafeAreaView`
    flex:1;
    align-items:center;
    justify-content:center;
`;

const Header = styled.View`
    align-items:center;
    justify-content:center;
    width:200px;
    height:40%;
    margin-bottom:10px;
`;

const Logo = styled.Image`
    width:200px;
    height:200px;
`;

const Body = styled.View`
    width:100%;
    align-items:center;
    justify-content:center;
    flex-direction:row;
`;

const CustomButton = styled.TouchableOpacity`
    width:100px;
    height:40px;
    border:1px solid ${props=>props.corBorda};
    background-color:${props=>props.corFundo};
    align-items:center;
    justify-content:center;
    margin-right:10px;
`;

const CorTextButton = styled.Text`
    color:${props=>props.corLetra};
    font-size:15px;
    font-weight:bold;
`;

const TelaInicialCadastro = ({navigation}) => {
    return(
        <Page>
            <Header>
                <Logo source={require("../img/logo.png")} />
            </Header>  
            <Body>
                <CustomButton corBorda="#000" corFundo="#00f" onPress={()=>navigation.navigate("Login")}>
                    <CorTextButton corLetra="#fff">Login</CorTextButton>
                </CustomButton>
                <CustomButton corBorda="#000" corFundo="green" onPress={()=>navigation.navigate("Cadastro")}>
                    <CorTextButton corLetra="#fff">Cadastro</CorTextButton>
                </CustomButton>
            </Body>
        </Page>
    )
}

export default TelaInicialCadastro;