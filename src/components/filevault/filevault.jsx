import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Marginer } from "../marginer";
import { Nav } from "../vault/Nav";
import FileList from "./FileList/FileList";
//import axios from "axios";
//import { useNavigate } from 'react-router-dom';
import { Button } from "../homepage/button";
import { FileUpload } from "./FileUpload/FileUpload";
import axios from "axios";
import config from "../../config.json";

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #000;
  color: #000;
`;
const BodyContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const MainContainer = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  min-height: 9vh;
  padding: 60px;
`;

const SomeContent = styled.h2`
  color: #fff;
  margin-left: 160px;
`;

const TextContent = styled.h2`
  color: #fff;
  display: flex;
  justify-content: center;
`;
const FileVault = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(config.serverAddress + "/all_files", {
          jwt: window.localStorage.getItem("token"),
        });
        console.log(res.data);
        console.log(res.data.data);
        if (res.data && res.data.data && res.data.data.length) {
          console.log(res.data.data.data);
          setFiles(
            res.data.data.map((f) => ({
              name: f.filename,
              content: f.content,
            }))
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  return (
    <>
      <AppContainer>
        <Nav />
        <Marginer direction="vertical" margin="5em" />
        <SomeContent>FileVault</SomeContent>
      </AppContainer>
      <TextContent>Upload your file</TextContent>
      <BodyContainer>
        <MainContainer>
          <FileUpload
            files={files}
            setFiles={setFiles}
            removeFile={removeFile}
          />
        </MainContainer>
        <FileList files={files} removeFile={removeFile} />
      </BodyContainer>

      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "#0000007f",
            zIndex: 999,
            color: "white",
            fontSize: "4em",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          Loading
        </div>
      )}
    </>
  );
};

export default FileVault;
