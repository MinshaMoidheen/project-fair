
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import DashBoard from './Pages/DashBoard'
import Auth from './Pages/Auth'
import MyProject from './Components/MyProject'
import Projects from './Pages/Projects'
import Footer from './Components/Footer'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';




function App() {

  return (
    <>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/login" element={<Auth/>}/>
      <Route path="/register" element={<Auth register/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/*" element={<Navigate to ={'/'}/>}/>

    </Routes>

    <Footer/>
     
    </>
  )
}

export default App
