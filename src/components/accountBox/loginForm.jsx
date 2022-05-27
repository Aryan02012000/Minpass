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
import { toast, ToastContainer } from "react-toastify";

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
        try {
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
        } catch (e) {
          console.log(e);
        }
      })();
    }

    if (window.localStorage.getItem("token")) {
      (async () => {
        try {
          const res = await axios.get(
            config.serverAddress +
              "/user?jwt=" +
              window.localStorage.getItem("token")
          );
          if (res.status == 200) {
            navigate("/vault");
          } else if (res.status === 400) {
            toast.error(res.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setDisable(false);
          }
        } catch (e) {
          navigate("/vault");
          setDisable(false);
        }
      })();
    } else {
      setDisable(false);
    }

    setDisable(false);
  }, []);

  const handleLogin = async (e) => {
    if (!email || !password) {
      toast.error("Email and password required", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (disabled) {
      return navigate("/vault");
    }
    setDisable(true);
    axios
      .post(config.serverAddress + "/login", {
        email: email,
        password: password,
      })
      .then(async (res) => {
        if (res.status == 200) {
          window.localStorage.setItem("token", res.data.jwt);
          try {
            let derivedKey = await cryptoUtils.PBKDF2(password, email);

            window.localStorage.setItem(
              "derivedKey",
              await cryptoUtils.exportKey(derivedKey, "raw")
            );
            setDisable(false);
            return navigate("/vault");
          } catch (e) {
            toast.error("Error deriving key", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setDisable(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 404) {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Failed to connect", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        setDisable(false);
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
      <MutedLink href="#">Don't have an account</MutedLink>
      <BoldLink href="#" onClick={switchToSignup}>
        <u>Signup</u>
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
export { LoginForm };
