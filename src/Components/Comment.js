import React,{useState, useEffect} from 'react'
import { database } from '../firebase';

import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

function Comment({postData}) {
  const [comments ,setComments] = useState(null);
  useEffect(async()=>{
    let arr = [];
    for(let i = 0; i < postData.comments.length; i++){
      let data = await database.comments.doc(postData.comments[i]).get();
      arr.push(data.data());
    }
    setComments(arr)
  }, [postData])
  return (
    <div> 
      {
        comments == null ? <CircularProgress />:
        <>  
        {
          comments.map((comment,index) => (
            <div style={{display: "flex"}}>
                <Avatar   src= {comment.UprofileImage} />
                <p>&nbsp;<span style={{fontWeight: "bold"}}>{comment.Uname}</span> &nbsp; &nbsp; {comment.text}</p>
            </div>

          ))
        }
        
        </>


      }


    </div>
  )
}

export default Comment;