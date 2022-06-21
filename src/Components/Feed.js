import React, { useState, useEffect, useContext } from 'react';
import {AuthProvider} from '../Context/AuthContext';
import { AuthContext } from '../Context/AuthContext';
import './Feed.css';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Upload from './Upload';
import { database } from '../firebase';
import Post from './Post';
import Navbar from './Navbar';

function Feed() {
  const { logout, user } = useContext(AuthContext);
  const[userData , setUserData] = useState('');
  useEffect(() =>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) =>{
      setUserData(snapshot.data());
    })
    
    return () => {unsub()}

  },[user])
  
  return (
    <>
    
    <Navbar />
   
    {/* <div>Welcome to Feed</div>
    <button onClick={logout}>Log out</button> */}
    <div className='main-cont' > 
       
      <Upload user = {userData}/>
      <Post userData = {userData} />

    
    </div>

    </>
  )
}

export default Feed;

