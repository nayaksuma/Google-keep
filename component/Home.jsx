
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

//components

import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';
import Login from './Login'

import {DataContext} from '../context/DataProvider';
import { useContext, useEffect, useState } from 'react';
import Logout from './Logout';
import Home2 from './Home2';
const Home = () => {
    const { setCount,count, setLoginSuccess, loginSuccess, setUserInfo,userInfo } = useContext(DataContext);
    const [user,setUser]=useState({})
    useEffect(()=>{
        const success=JSON.parse(localStorage.getItem('Login')||[])
        setUser(success)
    },[])
    console.log(user,'user');
    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <Router>
                {loginSuccess&&<SwipeDrawer />}
                <Routes>        
                    <Route path='/' element={<Home2 />} />
                    
                    <Route path='/Note' element={<Notes />} />
               
                    <Route path='/archive' element={<Archives />} />
                    <Route path='/delete' element={<DeleteNotes />} />
                    <Route path='/login' element={<Login />} />
                    
                    <Route path='/logout' element={<Logout setUser={setUser} user={user}/>}/>
                </Routes>
            </Router>
        </Box>
    )
}

export default Home;