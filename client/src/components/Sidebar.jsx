import React from 'react'
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
}from "react-icons/md";

import {FaTasks,FaTrashAlt, FaUsers} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const linkData = [
    {
        title: "Dashboard",
        icon: <MdDashboard/>,
        link: "dashboard",
    },
    {
        title: "Tasks",
        icon: <FaTasks/>,
        link: "tasks",
    },
    {
        title: "Team",
        icon: <FaTrashAlt/>,
        link: "team",
    },
    {
        title: "Completed",
        icon: <MdTaskAlt/>,        
        link: "completed/completed",
    },
    {
        title: "In Progress",
        icon: <MdOutlinePendingActions/>,
        link: "in-progress/in progress",
    },
    {
        title: "To Do",
        icon: <MdOutlinePendingActions/>,
        link: "todo/todo",
    },
    {
        title: "Trash",
        icon: <FaTrashAlt/>,
        link: "trashed",
    },
]

function Sidebar() {

    // Use the useSelector hook to access the user state from the store
    const {user} = useSelector((state)=>state.auth);
    // Use the useDispatch hook to dispatch actions
    const dispatch = useDispatch();

    // Use the useLocation hook to access the current location
    const location = useLocation();
    // Use the split method to split the pathname into an array and get the first element
    const path = location.pathname.split("/")[1];
    console.log("path: ",path);

    // the below condition is used to check if the user is an admin or not if the user is an admin then the sidebar links will be equal to the linkData else the sidebar links will be equal to the linkData.slice(0 to 4)
    const sidebarLinks = user?.isAdmin ? linkData: linkData.slice(0)


    // function to close the sidebar
    const closeSidebar = ()=>{
        dispatch(setOpenSidebar(false));
    }

    const Navlink = ({el})=>{
        return (
            <Link to = {el.link} onClick = {closeSidebar}
            className={clsx("w-full lg:w-3/4 flex gap-4 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed3d]",
                path === el.link.split("/")[0] ? "bg-blue-700 text-white": ""
            )}>
                {el.icon}
                <span className='hover:text-[#2564ed]'>{el.title}</span>

            </Link>        )
    }
  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
        <h1 className='flex gap-1 items-center'>
            <p className='bg-blue-600 p-2 rounded-full'>
                <MdOutlineAddTask className='text-white text-2xl font-black'/>
            </p>
            <span className='text-2xl font-bold text-black'>
                TaskMe
            </span>
        </h1>
        <div className='flex-1 flex flex-col gap-y-0.5 py-8'>
           {
                sidebarLinks.map((link)=>(
                     <Navlink el={link} key = {link.title} />
                ))
           }
        </div>
      
    </div>
  )
}

export default Sidebar;
