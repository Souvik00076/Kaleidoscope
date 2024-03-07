import { React,useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardSideBar from '../components/DashboardSideBar'
import DashboardProfile from '../components/DashboardProfile'
const Dashboard = () => {
  const location=useLocation()
  const [tab,setTab]=useState('')
  useEffect(()=>{
      const searchParams=new URLSearchParams(location.search)
      const tabUrlParam=searchParams.get('tab')
      if(tabUrlParam){
        setTab(tabUrlParam)
      }
  },[location])
  return (
    <div className='flex flex-col lg:flex-row  gap-4'>
      <DashboardSideBar  prop={tab}/>
      {
        tab==='profile' &&  <DashboardProfile/>
      }
    </div>
  )
}

export default Dashboard
