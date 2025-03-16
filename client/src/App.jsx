import React from 'react'
import { Route, Routes,Navigate,Outlet,useLocation, replace } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"
import Users from "./pages/Users"
import Trash from "./pages/Trash"
import TaskDetails from "./pages/TaskDetails"
import {Toaster} from "sonner"
import {useSelector} from 'react-redux'
import Sidebar from './components/Sidebar'

function Layout(){
  const {user} = useSelector((state)=>state.auth);

  const location = useLocation()
  // if the user doesn't exist or exists , using ternary operator to hendal the situation
  // for crating protacted routes 
  return user ?(
    // if the user exists
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar/>
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

    /*state={{from: location}}: This prop allows you to pass state to the new route. 
    Here, it passes the current location to the "/log-in" route. This can be useful for redirecting the user
     back to the original page they were trying to access after they log in.
    replace: This prop indicates that the navigation should replace the current entry in the history 
    stack instead of adding a new one. This means that after the navigation, the user won't be able 
    to go back to the previous page using the back button.*/
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
