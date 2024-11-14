import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { getUserProjectAPI } from '../services/allAPI'
import { addProjectResponseContext } from '../../ContextAPI/ContextShare'


function MyProject() {

  const[allprojects,setAllProjects]=useState([])
  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)


  const getUserProjects=async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        'authorization':`Bearer ${token}`
       
        }

        try{
          const result=await getUserProjectAPI(reqHeader)
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
    getUserProjects()
  },[addProjectResponse])

  return (
    <>

    <div className="card shadow mt-5 " style={{width:"800px"}}>
      <div className="d-flex m-2">
        <h2>My Projects</h2>
        <div className="ms-auto">
        <AddProject/>
      </div>
      </div>

      
      {allprojects?.length>0?allprojects.map((project,index)=>(
        <div key={index} className="mt-4 border container-fluid ">
        <div className="d-flex">
        <h3 className='text-dark'>{project.title}</h3>
          <div className="ms-auto">
          <a className='me-3 btn text-dark'><i class="fa-solid fa-pen-to-square"></i></a>
          <a className='me-3 btn text-dark' href={project.github} target='_blank'><i class="fa-brands fa-github"></i></a>
          <a className='me-3 btn text-dark'><i class="fa-solid fa-trash"></i></a>
        </div>
        </div>
          

       
      </div>
      )): <p className="text-danger fw-bolder">No Projects Added Yet</p>
      }
    </div>
      
    </>
  )
}

export default MyProject
