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
import {useNavigate} from 'react-router-dom';

 function ConfirmForm(props) {
  const {switchToSignin} = useContext(AccountContext);
  const [name,setName]=React.useState("");
  const [email,setEmail]=React.useState("");
  const [phone,setPhone]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [cpassword,setCpassword]=React.useState("");
  const navigate=useNavigate();
  const [disabled,setDisable]=React.useState(false);

  const [question, setQuestion] = useState("Select Question");

  const handleSignup=e=>{
    if(disabled){
      return
    }
    setDisable(true);
    axios.post(window.localStorage.getItem('serverAddress')+'/signup',{
      name,
      email,
      phone,
      password
    }).then(res=>{
      if(res.status==200){
        setDisable(false);
         return navigate('/signup');
       }else{
        setDisable(false);
       }
      
    }).catch(err=>{
      console.error(err)
      window.alert("Failed")
      setDisable(false);
    }) 
  }

  return (
      <BoxContainer>
          <Marginer direction="vertical" margin="2em"/>
      <FormContainer>
        
        <Input type="password" placeholder="Enter New Password" onInput={e=>setPassword(e.target.value)} /> 
        <Input type="password" placeholder="Confirm Password" onInput={e=>setCpassword(e.target.value)}  />         
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
     
      <Marginer direction="vertical" margin="3em" />
      <SubmitButton type="submit" onClick={handleSignup}>
        {disabled?"Loading":"Reset"}
      </SubmitButton>
      
      <Marginer direction="vertical" margin="1em"/>
      <MutedLink href="#">Back to Login<BoldLink href="#" onClick={switchToSignin}><u>Login</u></BoldLink></MutedLink>
    
      </BoxContainer>
    );
}
export { ConfirmForm };