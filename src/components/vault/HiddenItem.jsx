import React,{useState} from "react";

export function HiddenItem ({password}){
    const [show,setShow] = useState(false);
    
    return (<>
        <span style={{cursor:"pointer"}} onClick={()=>{setShow(!show)}}>{show?password:"********"}</span>
    </>)
    
    
  }