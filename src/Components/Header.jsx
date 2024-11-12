import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
Navbar

function Header() {
  return (
    <>
    <Navbar className="bg-dark ">
        <Container>
          <Navbar.Brand href="#home">
            <Link to={'/'} style={{textDecoration:"none",color:"white",fontWeight:"bolder"}}>
            <i class="fa-solid fa-list-check me-2"></i>
            Project Fair
            </Link>
            
          </Navbar.Brand>
        </Container>
      </Navbar>
      
    </>
  )
}

export default Header
