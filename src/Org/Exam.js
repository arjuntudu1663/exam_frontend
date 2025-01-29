import { Button,List,ListItem,ListItemButton,ListItemIcon,Paper,TextField, useScrollTrigger,Chip } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useEffect , useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Card, Col, Row,Modal } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LinkVercel } from '../Link';

const Exam = ({org_id}) => {
  
    const [exams,setExams] = useState([])
    const [modalFlag,setModalFlag] = useState(false)

    const [currQuestions,setCurrQuestions] = useState([])

     const myRef = useRef();
     const inputRef = useRef();


   
    const [details,setDetails] = useState({
        name:"",
        duration:"",
        organizer:"",
        status:'off',
        startTime:"",
        batchCode:""
    })

    const [question,setQuestion]= useState({
        title:"",
        marks:0,
        exam_id:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        answer:""
    });
    
    const createExam = async()=>{
        try{
            const response = await axios.post(`${LinkVercel}/exam_create`,{...details,organizer:org_id})
            console.log(response,"<============ create exam response")
            window.location.reload()
            
        }catch(e){}
    }

    const examOn = async(exam_id)=>{
        console.log(details,"<=== exam on details")
        console.log(myRef.current)
        try{
            const response = await axios.post(`${LinkVercel}/exam_on`,{exam_id:exam_id,org_id:org_id});
            console.log(response , "<=== on response")
            if(response.statusText === 'OK'){
                window.location.reload();
                console.log(myRef.current,"<========= ref current")
            }
            
        }catch(e){}
    }

    const examOff = async(exam_id)=>{

        try{
            const response = await axios.post(`${LinkVercel}/exam_off`,{exam_id:exam_id,org_id:org_id});
            console.log(response , "<=== off response")
            if(response.statusText === 'OK'){
                window.location.reload();
                console.log(myRef.current,"<========= ref current")
            }
            
        }catch(e){}
         
    }
    
    const addQuestion = async() =>{
        
         
        
        

        try{
            const response = await axios.post(`${LinkVercel}/add_question`,question)
            console.log(response,"<=== add question response")
            
            if(response.statusText === 'OK'){
                setQuestion((prev)=>{
                    return {...prev,title:"",option1:"",option2:"",option3:"",option4:"",marks:"",answer:""}
                })
            }
            
        }catch(e){}

    }

    const allQuestions_exam = async(exam_id) =>{
    
         try{
            const response = await axios.post(`${LinkVercel}/allQuestions_exam`,{exam_id:exam_id})
            
            setCurrQuestions(response.data.response)
            console.log(response.data,"<== curr questions")
            
         }catch(e){}
    
    }


    useEffect(()=>{
          
        const getExams = async () =>{
             
             try{

                const response = await axios.get(`${LinkVercel}/exam_all`);
                console.log(response.data)
                response.data.map((x)=>{
                    if(x.organizer === org_id){
                        setExams((prev)=>{
                            return [...prev,x]
                        })
                    }
                })
                console.log(exams)

             }catch(e){}
        }

        

       getExams()
       
    },[])

  return (
    <div style={{display:"",justifyContent:""}} >
       
        <Row>
            <Col lg = {4}>
            <div style={{border:"1px solid",padding:"15px",width:"auto"}}>
         <TextField onChange={e=>setDetails((prev)=>{return {...prev,name:e.target.value}})} placeholder='name of the exam' variant='standard'/>
        <p></p>
        
        <p></p>
        <TextField onChange={e=>setDetails((prev)=>{return {...prev,duration:e.target.value}})} placeholder='duration' variant='outlined'/>
        <p></p>
        <TextField onChange={e=>setDetails((prev)=>{
            return {...prev,batchCode:e.target.value}
        })} label = "batch code" variant='standard' />
        <p></p>
        <Button onClick={createExam} color='success' variant="contained">
        Create +
        </Button>
         </div>
         
            </Col>
            <Col lg = {8}>
            <div>
        
         
          <List style={{height:"500px",overflow:"scroll",padding:"15px"}}>
          <h4>Exams</h4>
             {exams.map((x)=>{
                
                return  <Paper elevation={3} style={{margin:"30px",padding:"15px"}}>

                     Name - <span style={{fontWeight:"bold"}}>{x.name}</span>
                     <p></p>
                     starting - <span style={{fontWeight:"bold"}}>{x.startTime}</span>
                     <p></p>
                     duration - <span style={{fontWeight:"bold"}}>{x.duration}</span> hr
                     <p></p>
                     status- <span style={{fontWeight:"bold"}}>{x.status}</span>
                     <p></p>

                     fullMars - {x.fullMarks}

                     <p></p>

                     batch code - <span style={{fontWeight:"bold"}}>{x.batchCode}</span> 
                     <p></p>
                    
                    <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                       <div>
                       { x.status === 'off' ? 
                     
                     <Button style={{}} onClick={e=>examOn(x._id)} variant='outlined' endIcon={<SendIcon />}>Start</Button>  
                     :
                     <Button style={{}} onClick={e=>examOff(x._id)} color='error' variant='outlined' >Stop</Button>
                    
                    }
                       </div>

                       <div>
                      {x.status === 'on' ? <></>:  <Button variant='contained' onClick={e=>setModalFlag(true)} color='success' >Edit</Button> }
                       </div>
                    </div>
                   
                    <Modal show = {modalFlag} >
                     <Modal.Header> Add questions</Modal.Header>
                        <Modal.Body>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            
                            >
                           Add Questions
                            </AccordionSummary>
                            <AccordionDetails>
                           
                            <TextField value={question.title} onChange={e=>setQuestion((prev)=>{
                                return {...prev,title:e.target.value}
                            })} variant='filled' placeholder='question'/> 
                            <p></p>
                            <TextField value = {question.option1}  onChange={e=>setQuestion((prev)=>{
                                return {...prev,option1:e.target.value,exam_id:x._id}
                            })} variant='outlined' placeholder='option A'/>

                            <TextField value = {question.option2} onChange={e=>setQuestion((prev)=>{
                                return {...prev,option2:e.target.value}
                            })} variant='outlined' placeholder='option B'/>

                           <TextField  value = {question.option3} onChange={e=>setQuestion((prev)=>{
                                return {...prev,option3:e.target.value}
                            })} variant='outlined' placeholder='option C'/>

                           <TextField value = {question.option4} onChange={e=>setQuestion((prev)=>{
                                return {...prev,option4:e.target.value}
                            })} variant='outlined' placeholder='option D'/>

                            <p></p>
                            <TextField value = {question.marks} onChange={e=>setQuestion((prev)=>{
                                return {...prev,marks:e.target.value}
                            })} variant='standard' placeholder='marks'/>
                            <p></p> 
                            <TextField value = {question.answer} onChange={e=>setQuestion((prev)=>{
                                return {...prev,answer:e.target.value}
                            })} success variant='filled' placeholder='answer'/>
                            <p></p>
                            <Button onClick={addQuestion} variant='contained'> Add </Button>
                           
                            </AccordionDetails>
                            </Accordion>

                            <Accordion ref = {myRef}  >
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                onClick={e=>allQuestions_exam(x._id)}
                             >
                              All Questions
                            </AccordionSummary>
                            <AccordionDetails style={{height:"500px",overflow:"scroll"}}>
                               
                                {
                                    currQuestions.map((x)=>{
                                       return<> <Card style={{display:"flex"}}>
                                            <Card.Header style={{display:"flex",justifyContent:"space-between"}}>
                                                <div style={{gap:"15px",display:"flex"}}>
                                                     <p>{x.title}</p>
                                                    <p style={{marginLeft:"15px",fontWeight:"bold"}}> {x.answer}</p>
                                                    </div> 


                                                <Button variant='outlined' color='error'>Delete</Button>
                                            </Card.Header>
                                            <Card.Body style={{display:"flex",gap:"15px"}}>
                                            
                                              <Chip  label={x.option1} />
                                              <Chip  label={x.option2}/>
                                              <Chip  label={x.option3} />
                                              <Chip  label={x.option4}/>
                                             
                                            </Card.Body>
                                        </Card>
                                        <p></p>
                                        </>
                                    })
                                }
                              
                            
                            </AccordionDetails>
                        </Accordion>
                            <p></p>
                           
                           
                        </Modal.Body>
                        <Modal.Footer><Button  color='error' onClick={e=>setModalFlag(false)}>close</Button></Modal.Footer>
                  </Modal>
                </Paper>
             })}
            
            
          </List>
        </div>
            </Col>
        </Row>
        
        
       
                   
      

       
        
    </div>
  )
}

export default Exam