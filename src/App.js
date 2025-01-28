import React, { useContext, useEffect, useState } from 'react'
import {   Card } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import { ButtonBase ,Button} from '@mui/material';

function App() {
  
  const navigate = useNavigate();
  const [flag,setFlag] = useState("login")
  const [loginDetails,setLoginDetails] = useState({
    username:"",
    password :""
  })
  const [registerDetails,setRegisterDetails] = useState({
    username:"",
    password :"",
    re_password:""
  })

  const register_org = async function(){
      console.log(registerDetails)
      try {
        const response = await axios.post("http://localhost:5000/organizer_register",registerDetails)
        if(response.data.value){
          setFlag("login")
        }
      }catch(e){}

  }

  const login_org = async function(){

    try {
      const response = await axios.post("http://localhost:5000/organizer_login",loginDetails)
     
         if(response.data.value){
              
           navigate("/Org_Home",{state:{"value":response.data.response}})

         }

         console.log(response)
   
    }catch(e){}
  }


  let element ; 
  switch(flag){
      
    case "login":
      element = <Card style={{padding:"15px"}}>
        <h1>Login</h1>
        <p></p>
      
      <TextField onChange={e=>setLoginDetails((prev)=>{
        return {...prev,username:e.target.value}
      })} id="filled-basic" label="username" variant="filled" style={{width:"50%"}} />
 
     <p></p>
     <TextField onChange={e=>setLoginDetails((prev)=>{
        return {...prev,password:e.target.value}
      })} id="filled-basic" label="password" variant="filled" style={{width:"50%"}} />
      <p></p>
      <Card.Footer>
      <Button onClick={login_org} color='success' variant='contained'>Login</Button>
      <p></p>
      <Button variant='outlined' onClick={e=>setFlag("register") }>Don't Have A Account?</Button>
      </Card.Footer>
       </Card>
       break;

    case "register":

    element=<Card style={{padding:"15px"}}>
      <h1>Register</h1>
      <p></p>
      <TextField onChange={e=>setRegisterDetails((prev)=>{
        return {...prev,username:e.target.value}
      })} id="filled-basic" label="username" variant="filled" style={{width:"50%"}} />
    <p></p>
    <TextField onChange={e=>setRegisterDetails((prev)=>{
        return {...prev,password:e.target.value}
      })} id="filled-basic" label="username" variant="filled" style={{width:"50%"}} />
    <p></p>
    <TextField onChange={e=>setRegisterDetails((prev)=>{
        return {...prev,re_password:e.target.value}
      })} id="filled-basic" label="username" variant="filled" style={{width:"50%"}} />
    <p></p>
    <Card.Footer>
    <Button onClick={register_org} variant='success'>Register</Button>
    <p></p>
    <Button variant='link' onClick={e=>setFlag("login")}>Already Have A Account?</Button>
    </Card.Footer>

     </Card>
     break;
       
 

  }
  return (
    <div style = {{width:"100%",display:"grid",placeItems:"center"}}>
   
       <div  style = {{width:"50%",marginTop:"10%"}} >
           {element}
           <hr></hr>
           <Button variant='contained' onClick={(e)=>{
             navigate("/Student_Login")
           }}>Student</Button>
       </div>
       
   
    </div>
  );
}

export default App;
