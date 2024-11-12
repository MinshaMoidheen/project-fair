import React from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCart from '../Components/ProjectCart'

function Projects() {
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
        <Col sm={12} md={6} lg={4}>
        <ProjectCart/>
        </Col>
    </Row>
      
    </>
  )
}

export default Projects
