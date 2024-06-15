import { Outlet } from 'react-router-dom'
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import ToTop from '../components/ToTop'

const MainLayout = () => {
  return (
    <>
        <Header />
        <Navbar />
        <Outlet />
        <ToTop />
    </>
  )
}

export default MainLayout