import React from "react";
import styled from "styled-components";
import { Logo } from "../logo";
import { HamburgerMenu } from "./hamburger";
 
const NavbarContainer=styled.div`
width: 100%;
height: 55px;
border-bottom: 1px solid #fff;
padding: 0 2em;
display: flex;
align-items: center;
flex direction: row-reverse;
justify-content: space-between;
`;


export function Nav(props){
    return (
        <NavbarContainer>
          
            <Logo inline/>
            <HamburgerMenu/>
          
        </NavbarContainer>
      );
}