import React from 'react'
import styled from "styled-components";
import { Marginer } from "../marginer";
import { Nav } from "../vault/Nav";
//import axios from "axios";
//import { useNavigate } from 'react-router-dom';
import { Button } from "../homepage/button";

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  min-height: 100vh;
  color: #000;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
`;

const SomeContent = styled.h2`
  color: #fff;
`;

const Settings = () => {
  return (
    <AppContainer>
      <Nav />
      <InnerContainer>
      </InnerContainer>
      <SomeContent>Setting</SomeContent>
     </AppContainer>
  )
}

export default Settings;