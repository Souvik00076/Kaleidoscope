import { Sidebar } from 'flowbite-react'
import React from 'react'

import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
const DashboardSideBar = (tab) => {
    return (
           <Sidebar>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                    active={tab.prop==='profile'} 
                    icon={PersonIcon} 
                    label="User">
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={ExitToAppIcon}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>        
  )
}

export default DashboardSideBar
