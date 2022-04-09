import React from "react";
import styled from "styled-components"

import { Marginer } from "../marginer";
import { Footer } from "./footer";

import { MoreAboutSection } from "./moreAboutSection";
import { ServicesSection } from "./servicesSection";
import { TopSection } from "./topSection";


const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Homepage = () => {
    return<PageContainer>
        <TopSection/>
        <ServicesSection/>
        <Marginer direction="vertical" margin='2em' />
        <MoreAboutSection/>
        <Marginer direction="vertical" margin='2em' />
        <Footer/>
        </PageContainer>
}
export default Homepage;