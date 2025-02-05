import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { TextField , Button } from '@mui/material';
import {LinkVercel} from '../Link';

const Student_Login = () => {

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
          const response = await axios.post(`${LinkVercel}/student_register`,{...registerDetails,stream:"",code:"",batch:""})
          if(response.data.value){
            setFlag("login")
          }
        }catch(e){}
  
    }
  
    const login_org = async function(){
  
      try {
        const response = await axios.post(`${LinkVercel}/student_login`,loginDetails)
       
           if(response.data.value){
                
             navigate("/Student_Home",{state:{"value":response.data.response}})
  
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
        <Button onClick={login_org} variant='contained' color='success'>Login</Button>
        <p></p>
        <Button variant='outlined'  onClick={e=>setFlag("register")}>Don't Have A Account?</Button>
        <p></p>
        <Button variant='outlined' href='/' color='error'>Organizer</Button>
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
        })} id="filled-basic" label="password" variant="filled" style={{width:"50%"}} />
      <p></p>
      <TextField onChange={e=>setRegisterDetails((prev)=>{
          return {...prev,re_password:e.target.value}
        })} id="filled-basic" label="re_password" variant="filled" style={{width:"50%"}} />
      <p></p>
      <Card.Footer>
      <Button onClick={register_org} variant='contained' color='success'>Register</Button>
      <p></p>
      <Button variant='outlined' onClick={e=>setFlag("login")}>Already Have A Account?</Button>
      <p></p>
      <Button variant='outlined' href='/' color='error'>Organizer</Button>
      
       
      </Card.Footer>
  
       </Card>
       break;
         
   
  
    }


  return (

    <div style={{width:"100%",display:"grid",placeItems:"center"}}>
           
           <div style={{width:"40%",marginTop:"200px"}}>
             <h1>Student</h1>
          
             <hr></hr>
               {element}
           </div>
        

    </div>

  )
}

export default Student_Login