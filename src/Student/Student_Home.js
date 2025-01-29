import { Chip, Paper,Button ,Accordion,AccordionActions,AccordionDetails,AccordionSummary,List,ListItem,ListItemButton,ListItemIcon, TextField} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState,useContext} from 'react'
import { Card,Row,Col ,Modal } from 'react-bootstrap'
import {useNavigate,useLocation} from 'react-router-dom'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Timer from './Timer'
import { FlagContext } from '../Starting'
import { LinkVercel } from '../Link'



const Student_Home = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [qf,ef,cm,scm,sqf,sef] = useContext(FlagContext)
    const [modalFlag,setModalFlag]=useState(false)
    const [onGoing,setOnGoing] = useState([])
    const [organizerAll,setOrganizerAll] = useState([])
    const [questions,setQuestions] = useState([])
    const [currMarks,setCurrMarks] = useState(0)
    const [answers,setAnswers] = useState(0) 
    const [currExamAnswerKey,setCurrExamAnswerKey] = useState([])
    const [map,setMap] = useState([])
    const [timer,setTimer] = useState()
    const [profile,setProfile] = useState({
      id:"",
      batch: "",
       roll_no:"",
       exams:[],
        stream :"",
      username: "",
    })
    const [additionalDetails,setAdditionalDetails] = useState({

      batch:"",
      stream:"",
      roll_no:""
    })

    const [examId,setExamId] = useState("")
    const [fm,sfm] = useState(0)
    
     const [nowTime,setNowTime] = useState(0);
     const [startTime,setStartTime] = useState("")
     const [goingTime,setGoingTime] = useState(0)
     const [endTime,setEndTime] = useState("")
     const [startFlag,setStartFlag] = useState(false)
     const [myExams,setMyExams] = useState([])
     const [examDetails,setExamDetails] = useState({
      name:"",
      duration:"",
      batchCode:""
      
     })

    const [disableFlag,setDisableFlag] = useState({
      "question":"",
       "1":false,
       "2":false,
       "3":false,
       "4":false
    })

    const all_exams = async(org_id)=>{
      
      setOnGoing([])
      
      try{
         const response = await axios.get(`${LinkVercel}/exam_all`)
         
   
         response.data.map((x)=>{
             if( x.organizer === org_id && x.status === 'on' && x.batchCode === profile.stream+"/"+profile.batch){
                 setOnGoing((prev)=>{
                     return [...prev,x]
                 })
             }
         })
         
      }catch(e){
        
      }

    }

    const my_exams = async()=>{
      
      console.log("hit")
      console.log(profile,"<==== prev profile")
      console.log(location.state.value,"<========= second value")
      
      try{
         const response = await axios.post(`${LinkVercel}/exam_my`,{batchCode:profile.stream+"/"+profile.batch,status:"on"})
         setMyExams(response.data)
         console.log(myExams,"<========= myExamssssssssssssssss")
   
      }catch(e){
        
      }

    }

    const getQuestions = async(exam_id,name,batchCode,duration,startTime)=>{
      setTimer(0)
      setQuestions([])
      setAnswers([])
      setTimer(duration)
      setExamId(exam_id)
      setStartTime(startTime)
      setStartFlag(true)
      setExamDetails((prev)=>{
        return {...prev,name:name,batchCode:batchCode,duration:duration}
      })
      timeCalculate()
    

      try{

        const response = await axios.post( `${LinkVercel}/allQuestions_exam`,{exam_id:exam_id})  
        console.log(response.data.response.length,"<=== fm")


        setQuestions(response.data.response);
        setCurrExamAnswerKey(response.data.answers)
        
       
        
  
        
      }catch(e){}

    }
 
    const timeCalculate = async(timer,startTime) =>{}

    const setAnswer = async(e,answer,question_id) =>{
          
     
        
         currExamAnswerKey.map((x)=>{
         if(x.question_id === question_id){
 
            const answer_str = x.question_id+"|"+e.target.value+"|"+x.answer
            const my = answer_str.split("|")[1];
            const original = answer_str.split("|")[2]
            if(my === original){
               
              x.marks = x.marks+1
              if(x.marks==1){
                scm((prev)=>{
                  return prev+1
                 })
              }
              
            }else{
              if(x.marks>0){
                 x.marks = x.marks-1
                 if(cm>0){
                  scm((prev)=>{
                    return prev-1
                  })
                 }
              }
            }
       

         }
       })

    
      
       
       

       
       //  currExamAnswerKey.map((x)=>{ 
         // if(x.question_id === question_id && e.target.value === x.answer){
         //    setAnswers((prev)=>{
           //   return [...prev,e.target.value]
        //     })
       //   }

       //  })
        
        
      
    }
    
    const setAdditional = async()=>{
      

      try{
         
        const response = await axios.post(`${LinkVercel}/student_update`,{...additionalDetails,id:location.state.value._id})
        console.log(response,"<====")
        setProfile((prev)=>{
          return {...prev,batch:response.data.batch,stream:response.data.stream,roll_no:response.data.roll_no}
        })
        if(response.statusText === "OK"){
          window.location.reload();
        }
          
        

      }catch(e){
      }  
      
    }


    useEffect(()=>{
        
      const organizer_all = async() =>{
         
        try{
          const response = await axios.get(`${LinkVercel}/organzer_all`)
        
          setOrganizerAll(response.data)
        }catch(e){}

      }

      const profileSet = async() =>{
         
        try{
          const response = await axios.post(`${LinkVercel}/student_find`,{id:location.state.value._id});
          
          setProfile(response.data.response)
           
          setProfile((prev)=>{
             return {...prev,id:response.data.response._id}
          })
          
          console.log(profile,"<====== profile 1st")
      
        }catch(e){

        }

      }

      


    //  setInterval(()=>{
    //    return setTimer(timer-1)
  //  },1000)

         

       organizer_all();
       profileSet();
       timeCalculate();
     
       
      console.log(location.state.value)
      

     
   
    },[cm,timer])


  return (

    <div style={{width:"100%",display:"grid",placeItems:"center"}}>
          
          <div style={{width:"80%",marginTop:"50px",padding:"35px"}}> 

            
          {qf? <></>  :<> <Button variant='contained' color='error' style={{marginLeft:"15px"}} href="/Student_Login">Log Out</Button></>}
                <Row>
                  <Col lg = {6} sm = {12 } style={{padding:"30px"}}>
                  {
                  ef? <div  >
              
                   <Paper style={{width:"80%",padding:"15px"}} elevation={4}>
                    <h2>{profile.username}</h2>
                 
                  
                
                  {profile.stream}/{profile.batch}/{profile.roll_no}
                  <p></p>
                
                 <Button variant='contained' color='success' onClick={my_exams}>Exams</Button>
                 <p></p>
                  {
                        myExams.map((x)=>{
                            return <Card   style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"15px",width:"100%",padding:"15px"}}>
                              <h3>{x.name}</h3>
                              fullMarks - {x.fullMarks}
                              <Button variant='outlined' style={{width:"30%"}} color='success'  onClick={e=>getQuestions(x._id,x.name,x.batchCode,x.duration,x.startTime)}>Open</Button>
                            </Card>
                        })
                    }        
                   </Paper>
                   <p></p>
                  
                   
                      
                    <p></p>
                    <Accordion  style={{width:"50%"}}>
   
                               <AccordionSummary
                               expandIcon={<ArrowDropDownIcon />}
                               >
                               Edit Profile
                               </AccordionSummary>
                               <AccordionDetails>
                                   {profile.username}
                                  <p></p>
                                  Stream
                                  <p></p>
                                   <TextField 
                                 variant='filled' onChange={e=>setAdditionalDetails((prev)=>{
                                     return {...prev,stream:e.target.value}
                                   })} label = {profile.stream}/>
                                  <p></p>
                                   Batch
                                   <p></p>
                                  <TextField  variant='filled'  onChange={e=>setAdditionalDetails((prev)=>{
                                     return {...prev,batch:e.target.value}
                                   })}  label = {profile.batch}/>
                                   <p></p>
                                   roll_no
                                   <p></p>
                                   <TextField variant='filled'  onChange={e=>setAdditionalDetails((prev)=>{
                                     return {...prev,roll_no:e.target.value}
                                   })}  label = {profile.roll_no} />
                                  <p></p>
                                  <Button variant='contained' onClick={setAdditional}  color='success'>save</Button>
                               </AccordionDetails>
   
                   </Accordion>

                   <div style={{height:"300px",overflow:"scroll",padding:"15px"}}>
                       
                       {
                        onGoing.map((x)=>{
                            return <Paper elevation={3}  style={{marginBottom:"15px",width:"50%",padding:"15px"}}>
                              <h3>{x.name}</h3>
                            
                              <Button variant='contained' color='success'  onClick={e=>getQuestions(x._id,x.name,x.batchCode,x.duration,x.startTime)}>Open</Button>
                            </Paper>
                        })
                        }        
                              
                        </div>
   
                              
                  
                   
   
              
                  </div>:<></>
                }
                  
                  </Col>
                  <Col lg = {qf?12:6} sm = {12} style={{padding:"25px"}}>

                
                 
                 <Paper style={{display:"flex",width:"100%",justifyContent:"space-between",marginTop:"",padding:"30px"}}>
                   <div>
                   
                    <h1>{cm}/{currExamAnswerKey.length}</h1>

                      Name - <h4 style={{fontWeight:"bold"}}> {examDetails.name}</h4>
                     <p></p>
                      Duration -   <h4 style={{fontWeight:"bold"}}> {examDetails.duration}</h4> 
                     <p></p>
                      BatchCode - <h4 style={{fontWeight:"bold"}}> {examDetails.batchCode}</h4> 
                
                   </div>

                   <Timer  timer={timer} student_id = {profile.id} curr_marks = {currMarks} exam_id = {examId}  startTime={startTime} />
                 </Paper>
                 <div style={{marginLeft:"10%",marginTop:"30px",height:"500px",width:"80%",overflow:"scroll"}}>
                 
                 
               
            
                    {
                      qf?<div>
                      {
                     questions.map((x)=>{
                       return <> <Card style={{display:"flex"}}>
                   
                       <Card.Body style={{display:"flex",gap:"15px"}}>
                       
                       <FormControl>
                       <FormLabel id="demo-radio-buttons-group-label">{x.title} </FormLabel>
                       <p></p>
                       <RadioGroup
                         aria-labelledby="demo-radio-buttons-group-label"
                       
                         name="radio-buttons-group"
                         style={{display:"flex",flexDirection:"row"}}
                         onChange={e=>setAnswer(e,x.answer,x._id)}
                       >
                         <FormControlLabel value={1} control={<Radio />} label={x.option1} />
                         <FormControlLabel value={2} control={<Radio />} label={x.option2} />
                         <FormControlLabel value={3} control={<Radio />} label={x.option3} />
                         <FormControlLabel value={4} control={<Radio />} label={x.option4} />
                       </RadioGroup>
                     </FormControl>
                         
                        
                       </Card.Body>
                   </Card>
                   <p></p>
                   </>
                     })
                    }
                      </div>:<></>
                    }

                 </div>

                
                
                
                  
                  </Col>
                </Row>
               
               
              
                 
              
              
                 


                 
          </div>

        

          <Modal show = {modalFlag} >
               
 
          </Modal>



    </div>
  )
}

export default Student_Home;
