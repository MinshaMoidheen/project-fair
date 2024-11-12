import React from 'react'
import AddProject from './AddProject'

function MyProject() {
  return (
    <>

    <div className="card shadow mt-5 ">
      <div className="d-flex m-2">
        <h2>My Projects</h2>
        <div className="ms-auto">
        <AddProject/>
      </div>
      </div>

      
      <div className="mt-4 border container-fluid ">
        <div className="d-flex">
        <h3>Project Title</h3>
          <div className="ms-auto">
          <a className='me-3 btn text-dark'><i class="fa-solid fa-pen-to-square"></i></a>
          <a className='me-3 btn text-dark'><i class="fa-brands fa-github"></i></a>
          <a className='me-3 btn text-dark'><i class="fa-solid fa-trash"></i></a>
        </div>
        </div>
          

        <p className="text-danger fw-bolder">No Projects Added Yet</p>
      </div>
    </div>
      
    </>
  )
}

export default MyProject
