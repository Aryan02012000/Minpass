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

function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const navigate = useNavigate();
  const [disabled, setDisable] = React.useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSignup = (e) => {
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
      .post(config.serverAddress + "/signup", {
        name,
        email,
        password,
        security_ques: question,
        security_ans: answer,
      })
      .then((res) => {
        if (res.status === 200) {
          // setDisable(false);
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
            return navigate("/signup");
          }, 2100);
        } else {
          console.error("err");
          Object.entries(res.data).forEach(([f, e]) => {
            toast.error(`${f} ${e}`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setDisable(false);
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
      });
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="Full Name"
          onInput={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          onInput={(e) => setEmail(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Phone No."
          onInput={(e) => setPhone(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onInput={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onInput={(e) => setCpassword(e.target.value)}
        />
        <select
          style={{
            color: "#000",
            borderBlockColor: "#fff",
            fontSize: "12.5px",
            padding: ".5em",
            font: "#000",
            borderRadius: "1em",
          }}
          name="question"
          id="question"
          value={question}
          onChange={(e) => {
            const selectquestion = e.target.value;
            setQuestion(selectquestion);
          }}
        >
          <option value="" label="Select your question...">
            Select your question...
          </option>
          <option value="In what city were you born?">
            In what city were you born?
          </option>
          <option value="What is the name of your favorite pet?">
            What is the name of your favorite pet?
          </option>
          <option value="What high school did you attend?">
            What high school did you attend?
          </option>
          <option value="What was your favorite food as a child?">
            What was your favorite food as a child?
          </option>
        </select>
        <Input
          type="Text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/* <MutedLink href="#">Forget your password?</MutedLink> */}
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSignup}>
        {disabled ? "Loading" : "Signup"}
      </SubmitButton>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Already have an account</MutedLink>
      <BoldLink href="#" onClick={switchToSignin}>
        <u>Login</u>
      </BoldLink>
      <Marginer direction="vertical" margin="2em" />
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
export { SignupForm };
