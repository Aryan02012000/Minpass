import React from 'react'
import styled from "styled-components";
import { Marginer } from "../marginer";
import { Nav } from "../vault/Nav";
//import axios from "axios";
//import { useNavigate } from 'react-router-dom';
import { Button } from "../homepage/button";
import './ds.css'
import Sidebar from './sidebar';
import Main from './main';
import Divide from './divide';
const MidContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  color: #000;
`;

const LowContainer = styled.div`
  background-color: #000;
  color: #000;
  min-height: 100vh;
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

const Store = () => {
  return (
    <>
    <MidContainer>
      <Nav/>
      <InnerContainer/>
      <SomeContent>Storage</SomeContent>
    </MidContainer> 
      <Divide/>     
      </>
  )
}

export default Store;