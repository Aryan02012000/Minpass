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

function ConfirmForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [password, setPassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const navigate = useNavigate();
  const [disabled, setDisable] = React.useState(false);

  const [question, setQuestion] = useState("Select Question");

  const handleSubmit = (e) => {
    if (disabled) {
      return;
    }
    setDisable(true);
    if (password !== cpassword) {
      toast.error(`Passwords do not match`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDisable(false);
      return;
    }

    axios
      .post(config.serverAddress + "/api/update_pass", {
        email: props.email,
        password,
        security_ans: props.answer,
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Success", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          toast.success("Redirecting to login", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            switchToSignin();
          }, 2100);
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
        switchToSignin();
      });
  };

  return (
    <BoxContainer>
      <Marginer direction="vertical" margin="2em" />
      <FormContainer>
        <Input type="email" disabled={true} value={props.email} />
        <Input
          type="password"
          placeholder="Enter New Password"
          onInput={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onInput={(e) => setCpassword(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />

      <Marginer direction="vertical" margin="3em" />
      <SubmitButton type="submit" onClick={handleSubmit}>
        {disabled ? "Loading" : "Reset"}
      </SubmitButton>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Back to Login
        <BoldLink href="#" onClick={switchToSignin}>
          <u>Login</u>
        </BoldLink>
      </MutedLink>
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
export { ConfirmForm };
