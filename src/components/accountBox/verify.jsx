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
import { toast, ToastContainer } from "react-toastify";
import config from "../../config.json";

function VerifyForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { switchToConfirm } = useContext(AccountContext);
  const navigate = useNavigate();
  const [disabled, setDisable] = React.useState(false);

  const [question, setQuestion] = useState("Select Question");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    if (disabled) {
      return;
    }
    setDisable(true);
    axios
      .post(config.serverAddress + "/api/forgot_pass_util", {
        email: props.email,
        security_ans: answer,
      })
      .then((res) => {
        if (res.status == 200) {
          setDisable(false);
          switchToConfirm(answer);
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
        switchToConfirm(answer);
      });
  };

  return (
    <BoxContainer>
      <Marginer direction="vertical" margin="2em" />
      <FormContainer>
        <Input type="text" value={props.question} disabled={true} />
        <Input
          type="text"
          placeholder="Answer"
          onInput={(e) => setAnswer(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />

      <Marginer direction="vertical" margin="3em" />
      <SubmitButton type="submit" onClick={handleSubmit}>
        {disabled ? "Loading" : "Reset"}
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
export { VerifyForm };
