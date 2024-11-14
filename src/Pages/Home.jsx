import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import gifimage from '../assets/images/image10.gif'
import ProjectCart from '../Components/ProjectCart'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../services/allAPI'
function Home() {

  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const navigate=useNavigate()
  const [allProjects,setAllProjects]=useState([])

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  })

  const getHomeProjects=async()=>{
    const result = await getHomeProjectAPI()
    if(result.status==200){
      setAllProjects(result.data)
    }else{
      console.log(result);
      
    }
  }


  const handleProjectsPage=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }
    else{
      toast.warning("please login to explore our projects...")
    }
  }

  return (
    <>
    <div className="container-fluid rounded bg-primary"  style={{width:"100%",height:"80vh"}}>
      <Row className="d-flex align-items-center p-5">

          <Col  sm={12} md={6} className="mt-5">
            <h1 style={{fontSize:"80px"}} className='fw-bolder text-light'><i class="fa-solid fa-list-check me-2"></i>Project Fair</h1>
            <p className='text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem adipisci vitae error et quis illum beatae quasi necessitatibus labore ab nobis in incidunt, ipsam nostrum, illo libero facilis. Doloremque, suscipit.
            </p>
            {isLoggedIn?<Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects</Link>:
            <Link to={'/login'} className='btn btn-warning'>Start to Explore</Link>}
          </Col>

          <Col  sm={12} md={6} className="mt-5">
            <img src={gifimage} alt="" width={"500px"} />

          </Col>
      </Row>

    </div>

    <div>
      
      <h1 className='text-dark text-center fw-bolder'>Explore Your Projects</h1>
      <marquee scrollAmount={25}>
      <Row>
        {allProjects?.length>0?allProjects.map(project=>(
          <Col sm={12}  md={6} lg={4}>
          <ProjectCart project={project}/>
          </Col>
        )):null
      }  
        
      </Row>
      </marquee>
    </div>

    <div className="d-flex justify-content-center text-dark fs-2 mt-3" onClick={handleProjectsPage}>View more Projects</div>
    <ToastContainer 
     position="top-center"
     autoClose={2000}
     theme="colored"
      />
    </>
  )
}

export default Home
