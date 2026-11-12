import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import {DataContext} from '../context/DataProvider';
import { useContext } from 'react';
export default function Logout({setUser}) {
    const { setCountTrue,countTrue,setCount,count, setLoginSuccess, loginSuccess, setUserInfo,userInfo } = useContext(DataContext);

    let navigate=useNavigate()
    const Logout =async () =>{
        localStorage.removeItem("User")
        localStorage.removeItem("Login")
        setCountTrue(false)
        setLoginSuccess(false)
        await navigate('/login')
    }
  return (
    <div><ListItem sx={{cursor:'pointer'}} onClick={Logout}>
    <ListItemIcon sx={{ alignItems: 'center'}}>
      <LockIcon/>
    </ListItemIcon>
    <ListItemText>Logout</ListItemText>
</ListItem></div>
  )
}
