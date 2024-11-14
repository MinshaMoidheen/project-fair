import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCart from '../Components/ProjectCart'
import { getAllProjectAPI } from '../services/allAPI'
import { all } from 'axios'

function Projects() {

  const[allprojects,setAllProjects]=useState([])

  const getAllProjects=async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        'authorization':`Bearer ${token}`
       
        }

        try{
          const result=await getAllProjectAPI(reqHeader)
          if(result.status==200){
            setAllProjects(result.data)
          }
          else{
            console.log(result)
          }

        }catch(err){
console.log(err);

        }
    }
  }

  console.log(allprojects)

  useEffect(()=>{
    getAllProjects()
  },[])


  return (
    <>
    <Header/>
    <div className='projects mt-5'>
        <h1 className='text-center mb-5'>All Projects</h1>

        <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex border w-50 rounded mb-3">
                <input type="text" className='form-control' placeholder='Search by technologies'/>
                <i style={{marginLeft:'-50px',marginTop:"12px"}} class="fa-solid fa-magnifying-glass"></i>
            </div>

        </div>

    </div>

    <Row className='container-fluid mt-5'>
    {allprojects?.length>0?allprojects.map(project=>(
          <Col sm={12}  md={6} lg={4}>
          <ProjectCart project={project}/>
          </Col>
        )):null
      }  
    </Row>
      
    </>
  )
}

export default Projects
