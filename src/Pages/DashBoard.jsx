import React, { Profiler, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Row,Col } from 'react-bootstrap'
import MyProject from '../Components/MyProject'
import Profile from '../Components/Profile'

function DashBoard() {

  const [username,setUsername]=useState("")

  useEffect(()=>{
if(sessionStorage.getItem("username")){
  setUsername(sessionStorage.getItem("username"))

}

else{
  setUsername('')
}
  },[])
  return (
    <>
      <Header/>

      <Row style={{justifyContent:"space-between"}}>
      <Col sm={12} md={4} >
      <h3>Welcome <span className='text-warning fw-bolder'>{username}</span>
        </h3>
        <MyProject/>
        </Col>

        <Col sm={12} md={4}>
        <Profile/>
        </Col>


      </Row>
    </>
  )
}

export default DashBoard
