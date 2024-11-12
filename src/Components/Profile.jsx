import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

function Profile() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div style={{ marginTop: '50px' }}>
        <div className="card shadow p-3 mt-5 me-2">
          <div className="d-flex justify-content-between">
            <h1>Profile</h1>
            <button 
              onClick={() => setOpen(!open)} 
              className='btn btn-outline-dark'
            >
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </div>

          <Collapse in={open}>
            <div className="row justify-content-center p-5">
              <label>
                <input type="file" style={{ display: "none", textAlign: "center", justifyContent: "center" }} />
          <img src="data:image/jpeg;base64,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" alt="" />
              </label>
              <div className="mt-5">
                <input type="text" placeholder='GitHub link' className='form-control' />
                <br />
                <input type="text" placeholder='LinkedIn link' className='form-control' />
              </div>
              <div className="d-grid mt-5">
                <button className='btn btn-dark'>Update</button>
              </div>
            </div>
          </Collapse>


        </div>
      </div>
    </>
  );
}

export default Profile;




