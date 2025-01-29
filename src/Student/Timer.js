import { Button, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState ,useContext} from 'react'
import { useTimer , useTime ,useStopwatch } from 'react-timer-hook';
import { FlagContext } from '../Starting';
import { Modal,Card } from 'react-bootstrap';
import { LinkVercel } from '../Link';

const Timer = ({timer,student_id,curr_marks,exam_id,startTime}) => {
    
    
    const [time,setTime] = useState(timer)
    const [flag,setFlag] = useState(false)
    const [myFlag,setMyFlag] = useState(false)
    const [qf,ef,cm,scm,sqf,sef] = useContext(FlagContext)
    const [modalFlag,setModalFlag] = useState(false)
    const [msg,setMsg] = useState("")

    

    const {
      totalSeconds ,
      seconds,
      minutes,
      isRunning,
      start,
      pause,
      reset,
    } = useStopwatch({});

    
    const examStart = function(){
       sef(false)
       sqf(true)
       start()

    }

    const examEnd = async function(){
       sef(true);
       sqf(false)

       try{
          
        const response = await axios.post(`${LinkVercel}/result_add`,{exam_id:exam_id,student_id:student_id,currentMarks:cm})
        console.log(response,"<========= result add response") 
        if(response.data.value == true){
           
           setMsg("Submission Successfull")
           setModalFlag(true)
        }else{
          setMsg("You Have Already Submitted")
          setModalFlag(true)
        }
      }catch(e){
         

       }
       
       scm(0)
       pause()
       reset()
       pause()

       
    }
    
  
    useEffect(()=>{
        
        
       

        console.log(startTime.split(" ")[0],"===",new Date().toLocaleTimeString().split(" ")[0])
        
        if(totalSeconds >= timer*60*60){
          setFlag(true)
          pause()
        }

        
       
        
      
 
    
    },[totalSeconds])

  return (
    <div style={{width:"40%"}}>
     
        <Card style={{padding:"35px"}}>
          {qf?<h4>{timer*60*60-totalSeconds} seconds left</h4>:<></>}
     
        
          
          <div style={{display:"flex"}}>
           
           
           {ef? <Button variant='outlined' color='success' onClick={examStart}>start</Button>:<></>}
          {qf?<Button style={{marginLeft:""}} variant='contained' color='error' onClick={examEnd}>Submit</Button>:<></>}
          </div>
          
          
  
        </Card>

        <Modal style={{marginTop:"10%"}} show={modalFlag}>
           <Modal.Body >
              {msg}
           </Modal.Body>
           <Modal.Footer>
            <Button variant='contained' color='error' onClick={e=>setModalFlag(false)}>Close</Button>
           </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Timer