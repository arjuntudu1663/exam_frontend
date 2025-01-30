import { Paper, TextField ,Button} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState , useRef } from 'react'
import {  Card, Col, Row , Modal } from 'react-bootstrap'
import { RxCross1 } from "react-icons/rx";
import { LinkVercel } from '../Link';

const Result = ({org_id}) => {
    
    const [exams,setExams] = useState([])
    const [searchResult,setSearchResult] = useState({})
    const [searchExamVal,setSearchExamVal] = useState("")
    const [examSearchVal,setExamSearchVal] = useState({})
    const [modalList,setModalList] = useState([])
    const [examSearchModal,setExamSearchModal] = useState(false)
    const [toggle,setToggle] = useState(true)
    const [modalToggle,setModalToggle] = useState(true)

    const boxRef = useRef();


    const searchStudent = (givers_list,val,exam_id,roll_no) => {
        
       
        setToggle(true)
        setModalToggle(true)

        if(val.length == 0){
           
          setSearchResult({})

        }

        console.log(val,"<========= roll no")

        givers_list.map((x)=>{
            
            if(x.exam_id === exam_id && x.name === val ){
                 
                setSearchResult(x)
            }

        })

        givers_list.map((y)=>{
            
          if(y.roll_no ==  parseInt(val)){
               
              setSearchResult(y)
          }

      })

        
         
    }

    const closeBox = function(){
       
      boxRef.current.style.display = "none"
    
       
    }

    const searchExam = (val) =>{
       
      
  
       setExamSearchModal(true)
       exams.map((x)=>{
          
        if(x.name === searchExamVal){

           setExamSearchVal(x)
           console.log(examSearchVal,"<===== exam search val")
            
        }

       })
         

    }
  
    useEffect(()=>{
         
        const all_exams = async() =>{ 

           try{
            const response = await axios.post(`${LinkVercel}/exam_org`,{id:org_id})
            console.log(response,"<==== org exams")
            setExams(response.data)
            
           }catch(e){}
             
        }

        all_exams();

    },[])

  return (
    <div> 
    <div style={{display:"flex",gap:"20px",marginLeft:"",padding:""}}>
    <input onChange={e=>setSearchExamVal(e.target.value)} style={{height:"",opacity:"0.6",padding:"5px"}} placeholder='search'  label = "search"/>
    <Button onClick={searchExam} variant='contained' color='success'>Search</Button>
    </div>
        <div style={{display:"flex",width:"100%",justifyContent:"space-between",padding:"15px"}}>
           
           
       
        </div>
        <Row style={{height:"500px",overflow:"scroll"}}>
        {exams.map((x)=>{
            return <Col lg = {4}>
             <Card style={{padding:"20px",height:"500px",marginBottom:"15px"}}>
                

                <div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between",padding:"15px"}}>
                  
                  <h4>{x.name}  <span style={{fontWeight:"bolder",opacity:"0.6"}}></span>  </h4><TextField onChange={e=>searchStudent(x.givers,e.target.value,x._id,x.roll_no)} label = " name / roll number"/>
                
                </div>
                <p>Full Marks - <span style={{fontWeight:"bold"}}>{x.fullMarks} </span></p>
                <p></p>
                <hr></hr>
                  <p></p>
                
                   {
                    toggle?<Paper elevation={4} style={{marginBottom:"30px"}}>
                    {
                     searchResult.exam_id === x._id ? <Card  style={{display:"flex",fontWeight:"bold",justifyContent:"space-between",width:"100%",padding:"15px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontWeight:"bold"}}>
                      <p> name - {searchResult.name} </p> <RxCross1 onClick={e=>setToggle(!toggle)}/>          
                      </div>
                      <p >   roll no - {searchResult.roll_no} </p>        
                       <p >  marks - {searchResult.marks}</p>   
                       </Card>
                     :<></>
                   }
                    </Paper>:<></>
                   }
               
              
                 <div style={{overflowY:"scroll"}}>
                 {x.givers.map((y)=>{
                    return <Card style={{padding:"15px",marginBottom:"10px",fontWeight:"bold"}}>
                      <p>name - {y.name}</p>
                      <p>roll no - {y.roll_no}</p>
                      <p>marks - {y.marks}</p>
                      </Card>
                })}
 
                 </div>
             </Card>
            </Col>
        })}
        </Row>

        <Modal style={{marginTop:"10%"}} show = {examSearchModal}>
             
           <Modal.Body>
                
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <h2>{examSearchVal.name}</h2>
                  <p style={{marginTop:"15px"}}>Full Marks - <span style={{fontWeight:"bold"}}>{examSearchVal.fullMarks}</span></p>
                  <TextField onChange={e=>searchStudent(examSearchVal.givers,e.target.value,examSearchVal._id)} label = "search"/>
                  </div>
                  
                 <hr></hr>
         
                
                    {
                      modalToggle?<Paper elevation={4} style={{marginBottom:"25px"}}>
                      {
                        searchResult.exam_id === examSearchVal._id ? <Card style={{padding:"15px",marginBottom:"10px",fontWeight:"bold"}}>
                         <div style={{display:"flex",justifyContent:"space-between"}}>
                         <p> name - {searchResult.name} </p>      <RxCross1 onClick={e=>setModalToggle(!modalToggle)}/>   
                         </div>
                        <p>roll no - {searchResult.roll_no}</p>
                        <p>marks - {searchResult.marks}</p>
                        </Card>:<></>
                      
                      }
                      </Paper>:<></>
                    }
               

             
              
              
                 <div style={{height:"300px",overflow:"scroll"}}>
                 {
                  examSearchVal.givers   ? <> {examSearchVal.givers.map((x)=>{
                    return  <><Card  style={{padding:"15px",marginBottom:"10px",fontWeight:"bold"}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <p> name - {x.name} </p>        
                      </div>
                    <p>roll no - {x.roll_no}</p>
                    <p>marks - {x.marks}</p>
                    </Card></>
                  })}</>:<></>
                }
                 </div>

           </Modal.Body>
           <Modal.Footer>
             <Button variant='contained' color='error' onClick={e=>setExamSearchModal(false)}>Close</Button>
           </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Result