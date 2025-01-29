import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import { Drawer } from '@mui/material';
import {  } from 'react-bootstrap';
import {List,ListItem,ListItemButton,ListItemIcon,Button} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Exam from './Org/Exam';
import Result from './Org/Result';

const Org_Home = () => {
  
    const location = useLocation()
    const [drawerFlag,setDrawerFlag] = useState(false)
    
    const [flag,setFlag] = useState("exam")
    let element ; 
    
    switch(flag){
        case "exam":
            element = <Exam org_id = {location.state.value._id}/>
            break;
        case "result":
            element = <Result org_id = {location.state.value._id}/>
            break;

    }

    useEffect(()=>{
        console.log(location.state.value , "<==== profile")
    },[])

  return (

    <div style={{width:"100%",display:"grid",placeItems:"center"}}>
        
        <div style={{width:"70%",marginTop:"100px"}}>
          
           <Drawer anchor="left" open = {drawerFlag}>
               <div style={{minWidth:"500px",padding:"55px"}}>
                 <div style={{width:"70%",display:"flex",justifyContent:"space-between"}}>
                    <h3>Organizer</h3>
                    <Button style={{marginLeft:"80%"}} onClick={e=>setDrawerFlag(false)} variant='contained' color='error'>close</Button>
                 </div>
                 <hr></hr>
                  <List>
                     <ListItem>
                        <ListItemButton onClick={e=>setFlag("exam")} style={{fontWeight:"bold"}}>
                        <ListItemIcon>
                            <AssignmentIcon fontSize='large'/>
                        </ListItemIcon>
                          Make A Exam
                        </ListItemButton>
                     </ListItem>
                     <ListItem>
                        <ListItemButton onClick={e=>setFlag("result")} style={{fontWeight:"bold"}}>
                        <ListItemIcon>
                            <AssignmentIcon fontSize='large'/>
                        </ListItemIcon>
                          Results
                        </ListItemButton>
                     </ListItem>
                  </List>
               </div>
           </Drawer>
            
          
            <div style={{display:"flex",gap:"30px"}}>
            <MenuIcon fontSize='large'  onClick={e=>setDrawerFlag(true)} />
             <Button href="/" variant='contained' color='error' >Log Out</Button>
            </div>
            <p></p>
            <Paper elevation={5} style={{padding:"35px"}}>
                  {element}
            </Paper>


        </div>
      
    </div>
  )
}

export default Org_Home