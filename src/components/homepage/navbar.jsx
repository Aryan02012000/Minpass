import React from "react";
import styled from "styled-components";
import { Logo } from "../logo";
 
const NavbarContainer=styled.div`
width: 100%;
height: 50px;
padding: 0 2em;
display: flex;
align-items: center;
justify-content: space-between;
`;

const BrandContainer = styled.div``;

export function Navbar(props){
    return (
        <NavbarContainer>
          <BrandContainer>
            <Logo inline/>
          </BrandContainer>
        </NavbarContainer>
      );
}