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
import { useNavigate } from "react-router-dom";

 function LoginForm(props) {
   const [email,setEmail]=React.useState("");
   const [password,setPassword]=React.useState("");
   const { switchToSignup } = useContext(AccountContext);
   const navigate=useNavigate();
   const [disabled,setDisable]=React.useState(false);

   const handleLogin=e=>{
     if(disabled){
        return navigate('/vault');
      //  return
     }
     setDisable(true);
     axios.post(window.localStorage.getItem('serverAddress')+'/login',{
       email,
       password
     }).then(res=>{
       if(res.status==200){
         window.localStorage.setItem('token',res.data.token);
         setDisable(false);
         return navigate('/vault');
        }else if(res.status==400){
          return navigate('/vault');
        }else{ 
          window.alert("Failed")
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
        <Input type="email" placeholder="Email" onInput={e=>setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" onInput={e=>setPassword(e.target.value)} />
        
     
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit"  onClick={handleLogin}>
      {/* <Link1 to="/vault">Login</Link1> */}
      {disabled?"Loading":"Login"}
      </SubmitButton>
      
      <Marginer direction="vertical" margin="1em"/>
      <MutedLink href="#">Don't have an account<BoldLink href="#" onClick={switchToSignup}><u>Signup</u></BoldLink></MutedLink>
      
      </BoxContainer>
    );
}
export { LoginForm };