import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Marginer } from "../marginer";
import { Nav } from "../vault/Nav";
import FileList from './FileList/FileList';
//import axios from "axios";
//import { useNavigate } from 'react-router-dom';
import { Button } from "../homepage/button";
import { FileUpload } from './FileUpload/FileUpload';
import axios from 'axios';
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

    const [files, setFiles] = useState([
      // {name:"",url:""}
  ])

  useEffect( ()=> {
    axios.get('http://192.168.1.5:5000/list')
    .then(res => setFiles(res.data))
  })


    const removeFile = (filename) => {
      setFiles(files.filter(file => file.name !== filename))
    }

    console.log(files)

  return (
    <>
    <AppContainer>
      <Nav />
      <Marginer direction="vertical" margin="5em"/>
      <SomeContent>FileVault</SomeContent>
     </AppContainer>
     <TextContent>Upload your file</TextContent>
     <BodyContainer>
     <MainContainer>
      <FileUpload files={files} setFiles={setFiles}  removeFile={removeFile}/>
     </MainContainer>
     <FileList files = {files} removeFile={removeFile} />
     </BodyContainer>
     </>
  )
}

export default FileVault;