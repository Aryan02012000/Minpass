import React from "react";
import { Element, scroller } from "react-scroll";
import styled from "styled-components";

import BackgroundImg from "../../assets/pictures/company_team.jpg";
import { Logo } from "../logo";
import { Marginer } from "../marginer";
import { Button } from "./button";
import { DownArrow } from "./downArrow";
import { Navbar } from "./navbar";
import { Link } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";

const TopContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
  background-image: url(${BackgroundImg});
  position: relative;
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(55, 55, 55, 0.89);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MotivationalText = styled.h1`
  font-size: 34px;
  font-weight: 500;
  line-height: 1.4;
  color: #fff;
  margin: 0;
  text-align: center;
`;

const DownArrowContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

export function TopSection(props) {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      (async () => {
        try {
          const res = await axios.get(
            config.serverAddress +
              "/api/user?jwt=" +
              window.localStorage.getItem("token")
          );
          if (res.status == 200) {
            setLoggedIn(true);
          } else {
          }
        } catch (e) {
          setLoggedIn(true);
        }
      })();
    } else {
      setLoggedIn(false);
    }
  });

  const scrollToNextSection = () => {
    scroller.scrollTo("ServicesSection", { smooth: true, duration: 1500 });
  };

  return (
    <Element name="topSection">
      <TopContainer>
        <BackgroundFilter>
          <Navbar />
          <Marginer direction="vertical" margin="8em" />
          <Logo />
          <Marginer direction="vertical" margin="4em" />
          <MotivationalText>Distributed Password Manager</MotivationalText>
          <MotivationalText>for the new WEB</MotivationalText>
          <Marginer direction="vertical" margin="2em" />

          <Button>
            <Link
              to={loggedIn ? "/vault" : "/signup"}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Login To Continue
            </Link>
          </Button>

          <DownArrowContainer onClick={scrollToNextSection}>
            <DownArrow />
          </DownArrowContainer>
        </BackgroundFilter>
      </TopContainer>
    </Element>
  );
}
