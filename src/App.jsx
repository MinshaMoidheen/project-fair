
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import DashBoard from './Pages/DashBoard'
import Auth from './Pages/Auth'
import MyProject from './Components/MyProject'
import Projects from './Pages/Projects'
import Footer from './Components/Footer'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useContext } from 'react'
import { TokenAuthContext } from '../ContextAPI/TokenAuth'




function App() {
  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)


  return (
    <>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={isAuthorized?<DashBoard/>:<Home/>}/>
      <Route path="/login" element={<Auth/>}/>
      <Route path="/register" element={<Auth register/>}/>
      <Route path="/projects" element={isAuthorized?<Projects/>:<Home/>}/>
      <Route path="/*" element={<Navigate to ={'/'}/>}/>

    </Routes>

    <Footer/>
     
    </>
  )
}

export default App
