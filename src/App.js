import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Vault from "./components/vault";
import  AccountBox  from "./components/accountBox";
import  Homepage from "./components/homepage";  
import {Routes, Route} from "react-router-dom";
import Generator from "./components/generator";
import Storage from "./components/storage";
import Setting from "./components/setting";
import FileStore from "./components/filevault";

const App = () => {
  
  return (

 <Routes>
   <Route exact path="/" element={ <Homepage/> } />
   <Route exact path='/signup' element={ <AccountBox/> } />
   <Route exact path='/vault' element={ <Vault/> } />
   <Route exact path='/generator' element={ <Generator/>} />
   <Route exact path='/storage' element={ <Storage/>} /> 
   <Route exact path='/setting' element={ <Setting/>} />  
   <Route exact path='/filevault' element={ <FileStore/>} />
 </Routes>
  
  );
}

export default App;