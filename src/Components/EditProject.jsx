import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { server_url } from '../services/server_url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../../ContextAPI/ContextShare';


function EditProject({project}) {
    const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)


  const handleClose = () => {
    setShow(false);
    setProjectData({
        title:project?.title,
        languages:project?.languages,
        overview:project?.overview,
        github:project?.github,
        website:project?.website,
        projectImage:""
    })
   
  }
  const [preview,setPreview]=useState('')



  const [projectData,setProjectData]=useState({
    id:project?._id,
    title:project?.title,
    languages:project?.languages,
    overview:project?.overview,
    github:project?.github,
    website:project?.website,
    projectImage:""
  })



  const handleUpdate=async()=>{
    const{id,title,languages,overview,github,website,projectImage}=projectData
if(!title || !languages || !overview || !github || !website ){
  toast.info("Plese fill all missing fields")
}
else{
    

 const reqBody=new FormData()

 reqBody.append("title",title)
 reqBody.append("languages",languages)
 reqBody.append("overview",overview)
 reqBody.append("github",github)
 reqBody.append("website",website)
 preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

 const token=sessionStorage.getItem('token')

 if(token){

  const reqHeader={
    "Content-Type":"multipart/form-data",
    'authorization':`Bearer ${token}`
   
    }
    try{
      const result=await updateProjectAPI(id,reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        handleClose()
        setEditProjectResponse(result.data)//context api integration
        
      }else{
        toast.warning(result.response.data)
      }

    }catch(err){
      console.log(err)
      
    }
  }
}
  }


  


  useEffect(()=>{
    if(projectData.projectImage){
        setPreview(URL.createObjectURL(projectData.projectImage))
        }else{
            setPreview("")
        }
},[projectData.projectImage])



  return (
    <>
    <button className='me-3 btn text-dark' onClick={handleShow}><i class="fa-solid fa-pen-to-square"></i></button>


    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="row">
            <div className="col-6">
              <label >

                <input type="file" style={{display:"none"}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
                <img height={"350px"}  width={"100%"} 
                src={preview?preview:`${server_url}/uploads/${project?.projectImage}`} alt="" />
              </label>
            </div>
            <div className="col-6">

         <Form>
         <FloatingLabel
        controlId="floatingInput1"
        label="project title"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="project title" value={projectData?.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })}/>
      </FloatingLabel>


      <FloatingLabel
        controlId="floatingInput2"
        label="language"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="language used" value={projectData?.languages} onChange={e => setProjectData({ ...projectData, languages: e.target.value })} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput3"
        label="overview"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="overview" value={projectData?.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput4"
        label="github link"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="github link" value={projectData?.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput5"
        label="website link"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="website link" value={projectData?.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} />
      </FloatingLabel>
         </Form>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} >
          Update
          </Button>
        </Modal.Footer>
      </Modal>
      
      <ToastContainer 
     position="top-center"
     autoClose={2000}
     theme="colored"
      />

    </>
  )
}

export default EditProject
