import React, { useContext, useEffect } from "react";
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
import cryptoUtils from "../cryptoUtils";

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { switchToSignup } = useContext(AccountContext);
  const { switchToForget } = useContext(AccountContext);
  const navigate = useNavigate();
  const [disabled, setDisable] = React.useState(true);

  useEffect(() => {
    if (
      !window.localStorage.getItem("publicKey") ||
      !window.localStorage.getItem("privateKey")
    ) {
      (async () => {
        try {
          const keyPair = await cryptoUtils.generateRSAKeyPair();
          const exportedPublicKey = await cryptoUtils.exportKey(
            keyPair.publicKey,
            "spki"
          );
          const exportedPrivateKey = await cryptoUtils.exportKey(
            keyPair.privateKey,
            "pkcs8"
          );
          window.localStorage.setItem("publicKey", exportedPublicKey);
          window.localStorage.setItem("privateKey", exportedPrivateKey);
        } catch (e) {
          window.location.reload();
        }
      })();
    } else {
      (async () => {
        const publicKey = window.localStorage.getItem("publicKey");
        const privateKey = window.localStorage.getItem("privateKey");

        const importedPublicKey = await cryptoUtils.importKey(
          publicKey,
          "spki"
        );
        const importedPrivateKey = await cryptoUtils.importKey(
          privateKey,
          "pkcs8"
        );

        console.log(importedPublicKey, importedPrivateKey);
      })();
    }
    setDisable(false);
  });

  const handleLogin = (e) => {
    if (!email || !password) {
      window.alert("Email and Password required");
      return;
    }

    if (disabled) {
      return navigate("/vault");
    }
    setDisable(true);
    axios
      .post(config.serverAddress + "/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status == 200) {
          window.localStorage.setItem("token", res.data.token);
          setDisable(false);

          return navigate("/vault");
        } else if (res.status == 400) {
          return navigate("/vault");
        } else {
          // window.alert("Failed")
          setDisable(false);
        }
      })
      .catch(async (err) => {
        console.error(err);
        //  window.alert("Failed")
        setDisable(false);
        return navigate("/vault");
      });
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onInput={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          onInput={(e) => setPassword(e.target.value)}
          required
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <BoldLink href="#" onClick={switchToForget}>
        <u>Forget your password?</u>
      </BoldLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleLogin}>
        {/* <Link1 to="/vault">Login</Link1> */}
        {disabled ? "Loading" : "Login"}
      </SubmitButton>

      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account
        <BoldLink href="#" onClick={switchToSignup}>
          <u>Signup</u>
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
export { LoginForm };
