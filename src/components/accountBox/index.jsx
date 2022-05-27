import React, { useRef, useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { SignupForm } from "./signupForm";
import { AccountContext } from "./accountContext";
import { ForgetForm } from "./forget";
import { VerifyForm } from "./verify";
import { ConfirmForm } from "./confirmpass";
import BackgroundImg from "../../assets/pictures/3382865257_7dedef23b0_o.jpg";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-color: #000;
  background-image: url(${BackgroundImg});
  background-position: center;
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(45, 45, 45, 0.56);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxContainer = styled.div`
  width: 300px;
  min-height: 590px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #ddd;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  margin-top: 70px;
`;
const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(251, 144, 15);
  background: linear-gradient(58deg, #00b997, #00b997);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};
const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};
const AccountBox = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const email = useRef("");
  const question = useRef("");
  const answer = useRef("");

  const play = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    play();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    play();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const switchToForget = () => {
    play();
    setTimeout(() => {
      setActive("forget");
    }, 400);
  };
  const switchToVerify = (e, q) => {
    play();
    email.current = e;
    question.current = q;
    setTimeout(() => {
      setActive("verify");
    }, 400);
  };
  const switchToConfirm = (a) => {
    play();
    answer.current = a;
    setTimeout(() => {
      setActive("confirm");
    }, 400);
  };

  const contextValue = {
    switchToSignup,
    switchToSignin,
    switchToForget,
    switchToVerify,
    switchToConfirm,
  };

  return (
    <AppContainer>
      <BackgroundFilter>
        <AccountContext.Provider value={contextValue}>
          <BoxContainer>
            <TopContainer>
              <BackDrop
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={backdropVariants}
                transition={expandingTransition}
              />
              {active === "signin" && (
                <HeaderContainer>
                  <HeaderText>MinPass </HeaderText>
                  <SmallText>Please sign-in to continue</SmallText>
                </HeaderContainer>
              )}
              {active === "signup" && (
                <HeaderContainer>
                  <HeaderText>MinPass </HeaderText>
                  <SmallText>Create Account</SmallText>
                </HeaderContainer>
              )}
              {active === "forget" && (
                <HeaderContainer>
                  <HeaderText>MinPass </HeaderText>
                  <SmallText>Verify your email</SmallText>
                </HeaderContainer>
              )}
              {active === "verify" && (
                <HeaderContainer>
                  <HeaderText>MinPass </HeaderText>
                  <SmallText>Give the verified answer</SmallText>
                </HeaderContainer>
              )}
              {active === "confirm" && (
                <HeaderContainer>
                  <HeaderText>MinPass </HeaderText>
                  <SmallText>Reset you password</SmallText>
                </HeaderContainer>
              )}
            </TopContainer>
            <InnerContainer>
              {active === "signin" && <LoginForm />}
              {active === "signup" && <SignupForm redirectHandler={setActive} />}
              {active === "forget" && <ForgetForm />}
              {active === "verify" && (
                <VerifyForm email={email.current} question={question.current} />
              )}
              {active === "confirm" && (
                <ConfirmForm email={email.current} answer={answer.current} />
              )}
            </InnerContainer>
          </BoxContainer>
        </AccountContext.Provider>
      </BackgroundFilter>
    </AppContainer>
  );
};
export default AccountBox;
