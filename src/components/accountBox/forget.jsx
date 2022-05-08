import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
import { toast, ToastContainer } from "react-toastify";

function ForgetForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { switchToVerify } = useContext(AccountContext);
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const [disabled, setDisable] = React.useState(false);

  const handleSubmit = (e) => {
    if (disabled) {
      return;
    }
    setDisable(true);
    axios
      .post(config.serverAddress + "/api/forgot_pass", {
        email,
      })
      .then((res) => {
        if (res.status == 200) {
          setDisable(false);
          switchToVerify(email, res.data);
        } else {
          setDisable(false);
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        toast.error("Failed to connect", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(err);
        setDisable(false);
        switchToVerify(email,"What is the time");
      });
  };

  return (
    <BoxContainer>
      <Marginer direction="vertical" margin="2em" />
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onInput={(e) => setEmail(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />

      <Marginer direction="vertical" margin="3em" />
      <SubmitButton type="submit" onClick={handleSubmit}>
        {disabled ? "Loading" : "Verify"}
      </SubmitButton>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Back to Login</MutedLink>
      <BoldLink href="#" onClick={switchToSignin}>
        <u>Login</u>
      </BoldLink>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BoxContainer>
  );
}
export { ForgetForm };
