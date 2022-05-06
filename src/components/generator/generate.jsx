import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import { Nav } from "../vault/Nav";
//import axios from "axios";
//import { useNavigate } from 'react-router-dom';
import { Button } from "../homepage/button";
import "./sty.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharactes,
} from "./character";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Copy_Success } from "./message";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
`;

// const BoxContainer = styled.div`
//   width: 95%;
//   min-height: 590px;
//   display: flex;
//   flex-direction: column;
//   border-radius: 19px;
//   background-color: #ccc;
//   position: relative;
//   overflow: hidden;
//   align-items: center;
// `;
// const FormContainer = styled.form`
//   margin-top:80px;
//   margin-left: 400px;
//   width: 50%;
//   display: flex;
//   flex-direction: column;
//  padding: 1em
// `;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
`;

const SomeContent = styled.h1`
  color: #fff;
`;
const HeadContent = styled.h4`
  color: #fff;
  height: 2em;
  font-size: 4em;
`;
const LowContent = styled.h4`
  color: #000;
  font-size: 1em;
  margin-top: 0.5em;
  text-align: left;
`;
const Generate = () => {
  const [password, setpassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(32);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setSymbols] = useState(false);

  const [listening, setListening] = useState(false);
  const [stream, setStream] = useState(null);

  const audioElement = useRef(null);
  const sampleData = useRef([]);
  const genIndex = useRef(0);

  const sampleTimeBase = 1200;

  const handleGeneratePassword = (e) => {
    if (
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols &&
      !includeUppercase
    ) {
      notify("you must select atleast one option", true);
    }
    let characterList = "";

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters;
    }

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters;
    }
    if (includeNumbers) {
      characterList = characterList + numbers;
    }
    if (includeSymbols) {
      characterList = characterList + specialCharactes;
    }

    setpassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    const gen = randomGenerator();

    if (sampleData.current.length) {
      notify("Using True Random generator", false);
      for (let i = 0; i < passwordLength; i++) {
        const characterIndex = Math.round(
          gen.next().value * characterListLength
        );
        password = password + characterList.charAt(characterIndex);
      }
    } else {
      notify("Using PRNG, sample audio for True Random", true);
      for (let i = 0; i < passwordLength; i++) {
        const characterIndex = Math.round(Math.random() * characterListLength);
        password = password + characterList.charAt(characterIndex);
      }
    }
    return password;
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(password);
    } catch {
      const newTextArea = document.createElement("textarea");
      newTextArea.innerText = password;
      document.body.appendChild(newTextArea);
      newTextArea.select();
      document.execCommand("copy");
      newTextArea.remove();
    }
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  function* randomGenerator() {
    let values = sampleData.current;

    while (true) {
      yield values[genIndex.current % values.length];
      genIndex.current++;
    }
  }

  const handleCopyPassword = (e) => {
    if (password === "") {
      notify("Nothing to Copy", true);
    } else {
      copyToClipboard();
      notify(Copy_Success);
    }
  };

  const handleStream = (s, l) => {
    if (s == null) {
      stream &&
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      window.persistentAudioStream = null;
      setStream(null);
      return;
    }

    window.persistentAudioStream = s;

    const audioContext = new AudioContext();
    const audioStream = audioContext.createMediaStreamSource(s);
    const analyser = audioContext.createAnalyser();
    audioStream.connect(analyser);
    analyser.fftSize = 1024;

    const frequencyArray = new Uint8Array(analyser.frequencyBinCount);

    const generate = () => {
      analyser.getByteFrequencyData(frequencyArray);
      // console.log(frequencyArray);
      frequencyArray.forEach((v) => {
        if (v) sampleData.current.push(v);
      });
      if (l) {
        requestAnimationFrame(generate);
      }
    };
    setTimeout(() => {
      l = false;
      handleStream(null);
      setListening(false);

      const maxValue = Math.max(...sampleData.current);
      const minValue = Math.min(...sampleData.current);
      console.log(maxValue);
      sampleData.current = sampleData.current.map((d) => {
        return (d - minValue) / maxValue;
      });
      // console.log(sampleData.current);
      // let dict = {};
      // sampleData.current.forEach((v) => {
      //   let k = ("" + v).slice(0, 4);
      //   if (dict[k]) {
      //     dict[k]++;
      //   } else {
      //     dict[k] = 1;
      //   }
      // });
      // console.log(dict);
    }, Math.random() * sampleTimeBase);
    generate();
  };

  const sample = () => {
    if (listening) {
      handleStream(null);
      setListening(false);
    } else {
      sampleData.current.splice(0, sampleData.current.length);
      setListening(true);
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((s) => {
          setStream(s);
          handleStream(s, true);
          setTimeout(() => sample, 1200);
        })
        .catch((e) => {
          if (e.message == "Permission denied") {
            notify(e.message, true);
            notify("Falling back to PRNG", true);
          } else {
            console.error(e.message);
            notify("Error connecting microphone", true);
          }
        });
    }
  };

  return (
    <AppContainer>
      <Nav />
      <InnerContainer></InnerContainer>
      <HeadContent>Password Generator</HeadContent>

      <div className="container">
        <div className="generator">
          <div className="generate_password">
            <LowContent>{password}</LowContent>
            <button className="copy__btn" onClick={handleCopyPassword}>
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="password-strength" style={{ fontSize: "1.2em" }}>
              Password Length
            </label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="256"
              min="8"
            />
          </div>

          <div className="form-group">
            <label htmlFor="uppercase-letters" style={{ fontSize: "1.2em" }}>
              Include Uppercase Letters
            </label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
              max="256"
              min="8"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lowercase-letters" style={{ fontSize: "1.2em" }}>
              Include Lowercase Letters
            </label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
              max="256"
              min="8"
            />
          </div>

          <div className="form-group">
            <label htmlFor="include-numbers" style={{ fontSize: "1.2em" }}>
              Include Numbers
            </label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
              max="256"
              min="8"
            />
          </div>

          <div className="form-group">
            <label htmlFor="include-symbols" style={{ fontSize: "1.2em" }}>
              Include Symbols
            </label>
            <input
              checked={includeSymbols}
              onChange={(e) => setSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
              max="256"
              min="8"
            />
          </div>
          <Marginer direction="vertical" margin="1em" />

          <div className="container">
            <Button style={{ width: "100%" }} onClick={handleGeneratePassword}>
              {" "}
              Generate Password{" "}
            </Button>

            <Marginer direction="vertical" margin="1em" />

            <Button style={{ width: "100%" }} onClick={sample}>
              {" "}
              {listening ? "Sampling" : "Sample audio"}
            </Button>
            <Marginer direction="vertical" margin="1em" />

            <audio ref={audioElement} controls style={{}}></audio>
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
          </div>
        </div>
      </div>

      {/* </FormContainer>
      </BoxContainer>
       */}
    </AppContainer>
  );
};

export default Generate;
