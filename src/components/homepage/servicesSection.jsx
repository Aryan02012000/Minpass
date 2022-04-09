import React from "react";
import { Element } from "react-scroll" 
import styled from "styled-components";
import { Marginer } from "../marginer";
import { OurService } from "./ourService";
import { SectionTitle } from "./sectionTitle";

import Service1Img from "../../assets/illustrations/web_development_.png";
import Service2Img from "../../assets/illustrations/mobile_phone.png";
import Service3Img from "../../assets/illustrations/bug_fixed.png";

const ServicesContainer = styled(Element)`
  width: 100%;
  height: 2000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

export function ServicesSection(props){
return (
       <ServicesContainer name="servicesSection">
       <SectionTitle>Best Quality Software</SectionTitle>
       <Marginer direction="vertical" margin="3em" /> 
       <OurService
        title="Fully integrated services"
        description="We build and deliver fully integrated password manager
          with secure vault features which can generate passwords for the users"
        imgUrl={Service1Img}
      />
      <OurService
        title="Mobile optimized"
        description="We build and deliver fully integrated webapps
          with customized control panels that fit your 
          compnay needs"
        imgUrl={Service2Img}
        isReversed
      />
      <OurService
        title="Quality is our priority"
        description="We have teams of developers and front_end-designers that ensures delivering the best 
        password manager for your company"
        imgUrl={Service3Img}
      />
       </ServicesContainer>
       );
}