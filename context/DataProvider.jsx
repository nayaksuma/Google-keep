import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    let initialValue;
    if(localStorage.getItem("Notes")==null){
        initialValue=[]
    }else{
        initialValue=JSON.parse(localStorage.getItem("Notes"));
    }
    const [notes, setNotes] = useState(initialValue);
    const [userInfo, setUserInfo] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(null);
    const [count, setCount] = useState(true);
    const [countTrue, setCountTrue] = useState(true);
    const [archiveNotes, setAcrchiveNotes] = useState([]);
    const [deleteNotes, setDeleteNotes] = useState([]);
    // useEffect(()=>{
    //     if(localStorage.getItem("User")==null){
    //         let userData={
    //           email:"email@gmail.com",
    //           password:"12345"
    //         }
    //         let success=false;
    //         localStorage.setItem("User",JSON.stringify(userData))
    //         localStorage.setItem("Login",JSON.stringify(success))
    //       }else{
    //         setUserInfo(JSON.parse(localStorage.getItem("User")))
    //         setLoginSuccess(JSON.parse(localStorage.getItem("Login")))
    //       }
    //   },[countTrue])
    useEffect(()=>{
        if(localStorage.getItem("Notes")==null){
            localStorage.setItem("Notes",JSON.stringify([]))
        }
    },[])
    useEffect(()=>{
            setNotes(JSON.parse(localStorage.getItem("Notes")))
    },[countTrue])
console.log(userInfo)
    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            archiveNotes,
            setAcrchiveNotes,
            deleteNotes,
            setDeleteNotes,
            setCount,
            count,
            loginSuccess,
            setLoginSuccess,
            setCountTrue,
            countTrue,
            userInfo,
            setUserInfo
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;