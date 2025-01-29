import React , {createContext, useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import App from './App'
import Org_Home from './Org_Home'
import Student_Home from './Student/Student_Home'
import Student_Login from './Student/Student_Login'

const FlagContext = createContext()

const Starting = () => {
  
  const [questionFlag,setQuestionFlag] = useState(false);
  const [examDisplayFlag,setExamDisplayFlag] = useState(true)
  const [currMakrs,setCurrMarks] = useState(0)
  const [fullMarks,setFullMarks] = useState(0)


 
  
  return (
     
    <FlagContext.Provider value={[questionFlag,examDisplayFlag,currMakrs,setCurrMarks,setQuestionFlag,setExamDisplayFlag]} >
        <Routes>
        <Route path = "/" element = {<App/>}/>
        <Route path = "/Org_Home" element = {<Org_Home/>}/>
        <Route path = "/Student_Login" element = {<Student_Login/>}/>
        <Route path = "/Student_Home" element = {<Student_Home/>}/>
    </Routes>
    </FlagContext.Provider>

  )
}

export  {FlagContext,Starting}