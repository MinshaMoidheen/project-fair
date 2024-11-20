import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { TokenAuthContext } from '../../ContextAPI/TokenAuth';


function Auth({register}) {

const isRegisterForm=register?true:false

const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
    const navigate=useNavigate()

    const [userData,setUserData]=useState({
        username:"",email:"",password:""
    })


    const handleRegister=async(e)=>{
        e.preventDefault()
       const{username,email,password}=userData

       if(!username|| !email || !password){
        toast.error("Please fill missing fields")
       }
       else{
        try{
            const result=await registerAPI(userData)
            if(result.status==200){
                toast.success(`${result.data.username} has registered successfully`)
                navigate('/login')
                
                setUserData({ username:"",email:"",password:""})
            }
            else{
                //toast message for already exist user
                toast.warning(result.response.data)
            }

        }catch(err){
            console.log(err);
            
        }
       
       }
    }


    const handleLogin=async(e)=>{
        e.preventDefault()
        const{email,password}=userData
        
       if(!email || !password){
        toast.error("Please fill missing fields")
       }
       else{
        try{
            
            const result=await loginAPI({email,password})
            if(result.status==200){
                sessionStorage.setItem("username",result.data.existingUser.username)
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorized(true)
                navigate('/')
            }

            else{
                toast.warning(result.response.data)
            }
        }catch(err){
            console.log(err);
        }      
       }
    }


  return (
    <>
     <div className='d-flex justify-content-center align-items-center'>
<div className='container w-75'>
<Link to={'/' } style={{textDecoration: 'none',color:'blue',fontweight:'bolder'}}><i class="fa-solid fa-arrow-left"></i>Back to Home</Link>
<div className='card shadow p-3 bg-info'> 
    <div className='row align-item-center'>
        <div className='col-lg-6'>
           <img src="https://tse1.mm.bing.net/th?id=OIP.aJ96dcxCE48UEmIXDnKgTwHaHa&pid=Api&P=0&h=180" alt="" width={"100%"}/>
        </div>
        
<div className='col-lg-6'>
    <div className="d-flex align-items-center flex-column">
        <h1 className='fw-bolder text-light mt-2'><i class="fa-solid fa-list-check me-2"></i>Project fair</h1>
        <h5 className='fw-bolder text-light mt-2'>{
            isRegisterForm?"Sign up to your account":"Sign in to your account"
            }

<Form  className="mt-4 text-dark">

      {isRegisterForm&&<Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
        
          <Form.Control  type="text" placeholder="Enter your username" 
          onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
       
      </Form.Group>}

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        
          <Form.Control type="email" placeholder="enter your email"
                     onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}/>

        
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        
          <Form.Control type="password" placeholder="enter your password" 
                    onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>

        
      </Form.Group>
    </Form>

    {
        isRegisterForm?<div className='mt-3'>
            <button  className='btn btn-warning' onClick={handleRegister}>Register</button>
            <p className='fw-bolder mt-2'>Already have an account?Click here to <Link style={{textDecoration:"none",color:"green"}} to={'/login'}>Login</Link></p>
        </div>:<div className='mt-3'>
            <button className='btn btn-warning' onClick={handleLogin}>Login</button>
            <p className='fw-bolder mt-2'>Already have an account?Click here to <Link style={{textDecoration:"none",color:"red"}} to={'/register'}>Register</Link></p>
        </div>
    }

        </h5>

    </div>

</div>

</div>
   

</div>
</div>
     </div>
     <ToastContainer 
     position="top-center"
     autoClose={2000}
     theme="colored"
      />
    </>
  )
}

export default Auth

