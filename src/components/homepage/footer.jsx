import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { Logo } from "../logo";
import { Marginer } from "../marginer";
import { Button } from "./button";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link as Link1} from "react-router-dom";
const FooterContainer = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1f1f1f;
  position: relative;
`;

const MotivationalText = styled.h1`
font-size: 28px;
font-weight: 500;
line-height: 1.4;
color: #fff;
margin: 0;
text-align: center;
`;

const PrivacyContainer = styled.div`
  display: flex;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  color: #fff;
  font-size: 20px;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:not(:last-of-type) {
    margin-right: 11px;
    @media screen and (max-width: 480px) {
    margin-right: 9px;
    }
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
  &:hover {
    color: #adadad;
  }
`;

const Link = styled.a`
color: #fff;
transition: all 200ms ease-in-out;
cursor: pointer;
font-size: 14px;
&:not(:last-of-type) {
  margin-right: 11px;
  @media screen and (max-width: 480px) {
    margin-right: 9px;
  }
}
@media screen and (max-width: 480px) {
  font-size: 12px;
}
&:hover {
  color: #adadad;
}
`;

const AccessibilityContainer = styled.div`
  width: 80%;
  display: flex;
  border-top: 1px solid #cdcdcd;
  padding-top: 12px;
  padding-right: 10px;
  padding-left: 10px;
  color: #fff;
  justify-content: space-between;
  @media screen and (max-width: 480px) {
    width: 90%;
    padding-left: 8px;
    padding-right: 8px;
  }
`;



export function Footer(props) {
    return <FooterContainer>
      <Marginer direction="vetical" margin="3em"/>
      <Logo small/>
      <Marginer direction="vetical" margin="1em"/>
      <MotivationalText>Keep it safe</MotivationalText>
      <Marginer direction="vetical" margin="1em"/>
      <Button>
      <Link1 to="/signup" style={{textDecoration: "none", color: "#fff"}}>Login to Continue</Link1>
      </Button>
      <Marginer direction="vetical" margin="5em"/>
      <AccessibilityContainer>
        <PrivacyContainer>
          <Link>Privacy Policy</Link>
          <Link>Terms of Service</Link>
          <Link>Contact</Link>
        </PrivacyContainer>
        <SocialContainer>
          <SocialIcon>
            <FontAwesomeIcon icon={faTwitter}/>
          </SocialIcon>
          <SocialIcon>
            <FontAwesomeIcon icon={faLinkedin}/>
          </SocialIcon>
        </SocialContainer>
      </AccessibilityContainer>
    </FooterContainer>
}