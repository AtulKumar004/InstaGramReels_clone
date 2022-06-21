import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Videos from './Videos';
import './Post.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import Comment from './Comment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Like2 from './Like2';
import AddComment from './AddComment';



import Typography from '@mui/material/Typography';
function Post({ userData }) {
    // const { logout} = useContext(AuthContext);
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);
    const handleClickOpen = (id) => {
        setOpen(id);
      };
    
      const handleClose = () => {
        setOpen(null);
      };
       useEffect(() =>{
           let parr;
           const unsub = database.posts.orderBy('createdAt' , 'desc').onSnapshot((querySnapshot) =>{
                parr = [];
                querySnapshot.forEach((doc) => {
                    let data = {...doc.data() , postId :doc.id }
                    parr.push(data);
                })

                setPosts(parr);


           })
           return () => unsub();
       },[]);

    
    console.log(posts);
    // console.log("userData => " + userData);
    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress /> :

                    <div className='video-cont'>
                        {
                            posts.map((post,index)=>(
                                <React.Fragment key={index}>
                                    {/* {console.log(post)} */}
                                    <div className="videos">
                                        <Videos src={post.pUrl} id={post.pId}/>
                                        <div className='fa' > 
                                            <Avatar   src= {userData.profileUrl} />
                                            <h4>{userData.fullname}</h4> 
                                        
                                        </div>

                                        <Like userData={userData} postData ={post} />
                                        <span className="material-icons chat-styling" onClick={(e)=>handleClickOpen(post.pid)}>
                                        chat_bubble
                                        </span>
                                        <Dialog
                                            open={open == post.pid}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth = {true}
                                            maxWidth = 'md'
                                            
                                        >
                                            <div className='model-cont'>
                                                <div className='video-modal'>
                                                    <video autoPlay = {true} muted = "muted" controls>
                                                        <source src = {post.pUrl}></source>  
                                                    </video>
                                                    
                                                </div>
                                                <div className='comment-model'>
                                                 <Card className='card4'>
                                                     <Comment postData={post}/>
                                                </Card>
                                                <Card variant='outlined' className='card3'>
                                                    {/* // Like Button 
                                                    // Like by user no.
                                                    // Post  */}

                                                    <Typography style={{padding: "0.4rem"}}>{post.likes.length == 0 ? ' ' : ` Like by ${post.likes.length} users`}</Typography>
                                                    <div style={{display : 'flex'}}>
                                                        <Like2 className = "Like2" postData= {post} userData = {userData}/>
                                                        <AddComment userData = {userData} postData = {post}/>
                                                    </div>
                                                </Card>
                                                    
                                                </div>

                                            </div>

                                            
                                        </Dialog>

                                         
                                    </div>
                                </React.Fragment>
                            ))
                        }
                        
                        

                    </div>
            }

        </div>
    )
}

export default Post;