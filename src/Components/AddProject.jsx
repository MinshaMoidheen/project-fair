import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../../ContextAPI/ContextShare';

function AddProject() {


  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      title:"",languages:"",overview:"",github:"",website:"",projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  const [projectData,setProjectData]=useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })

  const [fileStatus,setfileStatus]=useState(false)
  const[preview,setPreview]=useState("")
  console.log(projectData.projectImage.type)

  useEffect(()=>{
    if(projectData.projectImage.type=='image/png' ||
      projectData.projectImage.type=='image/jpeg' ||projectData.projectImage.type=='image/jpg' 
    ){
      
      console.log("generate url");
      setPreview(URL.createObjectURL(projectData.projectImage))
      setfileStatus(false)
      
    }

    else{
      console.log("Please provide following extension");
      setfileStatus(true)
    }
  },[projectData.projectImage])


  const handleAddProjects=async()=>{
const{ title,languages,overview,github,website,projectImage}=projectData
if(!title || !languages || !overview || !github || !website || !projectImage){
  toast.info("Plese fill all missing fields")
}
else{
    

 const reqBody=new FormData()

 reqBody.append("title",title)
 reqBody.append("languages",languages)
 reqBody.append("overview",overview)
 reqBody.append("github",github)
 reqBody.append("website",website)
 reqBody.append("projectImage",projectImage)

 const token=sessionStorage.getItem('token')

 if(token){

  const reqHeader={
    "Content-Type":"multipart/form-data",
    'authorization':`Bearer ${token}`
   
    }
    try{
      const result=await addProjectAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        handleClose()
        setAddProjectResponse(result.data)
      }else{
        toast.warning(result.response.data)
      }
      

    }catch(err){
      console.log(err)
    }
 }




}
  }

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="row">
            <div className="col-6">
              <label >

                <input type="file" style={{display:"none"}}  onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                <img height={"350px"}  width={"100%"} src={ preview?preview:"https://icons.veryicon.com/png/o/miscellaneous/avue-data/img-11.png"} alt="" />
              </label>
           {fileStatus&& <div className='mt-3 text-danger'>please upload the following file extensions (jpeg/png/jpg)</div>}
            </div>
            <div className="col-6">

         <Form>
         <FloatingLabel
        controlId="floatingInput1"
        label="project title"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="project title" onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
      </FloatingLabel>


      <FloatingLabel
        controlId="floatingInput2"
        label="language"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="language used" onChange={e=>setProjectData({...projectData,languages:e.target.value})}/>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput3"
        label="overview"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="overview"  onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput4"
        label="github link"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="github link" onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput5"
        label="website link"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="website link" onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
      </FloatingLabel>
         </Form>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProjects}>
          Add
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

export default AddProject
