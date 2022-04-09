import React, { useContext } from "react";
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

 function SignupForm(props) {
  const {switchToSignin} = useContext(AccountContext);
  const [name,setName]=React.useState("");
  const [email,setEmail]=React.useState("");
  const [phone,setPhone]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [cpassword,setCpassword]=React.useState("");
  const navigate=useNavigate();
  const [disabled,setDisable]=React.useState(false);

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
      <FormContainer>
        <Input type="text" placeholder="Full Name" onInput={e=>setName(e.target.value)} />
        <Input type="email" placeholder="Email" onInput={e=>setEmail(e.target.value)} />
        <Input type="number" placeholder="Phone No." onInput={e=>setPhone(e.target.value)} />
        <Input type="password" placeholder="Password" onInput={e=>setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" onInput={e=>setCpassword(e.target.value)} />
     
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/* <MutedLink href="#">Forget your password?</MutedLink> */}
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSignup}>
        {disabled?"Loading":"Signup"}
      </SubmitButton>
      
      <Marginer direction="vertical" margin="1em"/>
      <MutedLink href="#">Already have an account<BoldLink href="#" onClick={switchToSignin}><u>Login</u></BoldLink></MutedLink>
      
      </BoxContainer>
    );
}
export { SignupForm };