import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import { SectionTitle } from "./sectionTitle";

import AboutImgUrl from "../../assets/illustrations/rocket_launch_.png";

const MoreAboutContainer = styled(Element)`
  min-height: 980px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  @media screen and (max-width: 480px) {
  max-width: 100%;
  flex-direction: column-reverse;
  }
`;

const AboutText = styled.p`
font-size: 21px;
color: #2f2f2f;
font-weight: normal;
line-height: 1.4;
`;

const AboutImg = styled.img`
  width: 600px;
  height: 500px;
  margin-left: 2em;
  @media screen and (max-width: 480px) {
  width: 370px;
  max-width: 370px;
  height: 290px;
  margin-left: 0;
  }
`;

export function MoreAboutSection(props) {
  return (
    <MoreAboutContainer>
      <SectionTitle style={{"color":"white"}}>More About Minpass</SectionTitle>
      <AboutContainer>
        <AboutText style={{"color":"white"}}>
        Minpass is password manager with vault capability to store users login
        details for different web portals/services, card details like credit card info, debit card info, identification
        card and any other kind of secret texts like recovery codes or passphrases or files.{" "}
        In our project we aim to develop a secure password manager and combining security and reliability of blockchain
       technology by distributing users data into several blocks in a distributed manner removing any possibility
        of single point of breach.
        </AboutText>
        <AboutImg src={AboutImgUrl} />
      </AboutContainer>
        </MoreAboutContainer>
  );
}