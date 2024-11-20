import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthContext } from '../../ContextAPI/TokenAuth'


function Header({insideDashboard}) {
  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  const navigate=useNavigate()

  const handleLogout=()=>{
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    setIsAuthorized(false)
    navigate('/')
  }
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
          {insideDashboard && <Button className='btn' onClick={handleLogout}>Logout</Button> }
        </Container>
      </Navbar>
      
    </>
  )
}

export default Header
