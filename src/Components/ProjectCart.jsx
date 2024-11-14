import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import projectPic from '../assets/images/project_structure.jpeg'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { server_url } from '../services/server_url';


function ProjectCart({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${server_url}/uploads/${project?.projectImage}`} onClick={handleShow} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
        
      </Card.Body>
    </Card>
      
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
            <img src={`${server_url}/uploads/${project?.projectImage}`} alt="" width={"100%"} />
            </Col>
            <Col md={6}>
            
            <h1 className='fw-bolder'>{project?.title}</h1>
            <h3 className='fw-bolder text-danger'>Languages Used:{project?.languages}</h3>
            <p><span className='fw-bolder text-danger'>OverView:</span>{project?.overview}</p>
            </Col>

          </Row>
          <div className="mt-2">
            <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i class="fa-brands fa-github fa-2x"></i></a>
            <a href={project?.website} target='_blank' className='me-3 btn text-dark'><i class="fa-solid fa-link fa-2x"></i></a>

          </div>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default ProjectCart
