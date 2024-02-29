import React from 'react'
import {Button, Navbar, TextInput} from 'flowbite-react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useLocation } from 'react-router-dom';
const Header = () => {
  const location=useLocation()

  return (
    <Navbar className='border-b-2'>
       <Link to="/" className=' self-center no-underline text-sm lg:text-xl text-white'>
        <span className=' bg-gradient-to-r from-orange-400 via-red-500 to-pink-500
                         px-6 py-2 rounded-lg'>
        Kaliedoscope
        </span>
       </Link>


      <form>
        <TextInput 
          id='search-input' 
          placeholder='Search..' 
          rightIcon={SearchIcon}
          className='hidden lg:inline'
          />
      </form>
      
      
      <Button className='h-10 w-12 lg:hidden' color='gray' pill>
        <SearchIcon/>
      </Button>
      
      
      <div className='flex flex-row gap-2 items-center md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline-flex' pill color='gray'>
          <ModeNightIcon/>
        </Button>
        <Link to='/signin'>
          <Button outline gradientDuoTone="pinkToOrange">SignIn</Button>
        </Link>
        <Navbar.Toggle/>
      {/* Navbar.collapse for navbar*/}
      </div>
      
      
      <Navbar.Collapse>
        <Navbar.Link active={location.pathname==='/'} as={'div'}>
          <Link to='/' >Home</Link>
        </Navbar.Link>
        <Navbar.Link active={location.pathname==='/about'} as={'div'}>
          <Link to='/about' >About</Link>
        </Navbar.Link>
        <Navbar.Link active={location.pathname==='/projects'} as={'div'}>
          <Link to='/projects' >Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    
    </Navbar>
  )
}

export default Header
