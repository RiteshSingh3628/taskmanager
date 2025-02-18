import React from 'react'
import { Route, Routes,Navigate,Outlet,useLocation, replace } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"
import Users from "./pages/Users"
import Trash from "./pages/Trash"
import TaskDetails from "./pages/TaskDetails"
import {Toaster} from "sonner"

function Layout(){
  const user = ""

  const location = useLocation()
  // if the user doesn't exist or exists , using ternary operator to hendal the situation
  // for crating protacted routes 
  return user ?(
    // if the user exists
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        {/* <Sidebar/> */}
      </div>
      {/* <MobileSidebar/> */}

      <div className='flex-1 overflow-y-auto'>
        {/* <Navbar/> */}
        <div className='p-4 2xl:px-10'>
          <Outlet/>
        </div>

      </div>

    </div>
    
  ) : (
    // if the user doesn't exist
    <Navigate to="/log-in" state={{from: location}} replace/>
  )

}

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
    <Routes>
      {/* we will created protected routes */}
      <Route element = {<Layout/>}>
        <Route path='/' element={<Navigate to= "/dashboard" />}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/tasks' element={<Tasks/>} />
        <Route path='/completed/:status' element={<Tasks/>} />
        <Route path='/in-progress/:status' element={<Tasks/>} />
        <Route path='/todo/:status' element={<Tasks/>} />
        <Route path='/team' element={<Users/>} />
        <Route path='/trashed' element={<Trash/>} />
        <Route path='/task/:id' element={<TaskDetails/>} />
      </Route>
        <Route path='/log-in' element={<Login/>} />

    </Routes>    
    
    
    {/* we will be using toaster for push notifications */}
    <Toaster richColors /> 
    </main>
  )
}

export default App
