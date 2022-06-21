import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';



function Like({ userData, postData }) {
    const [like, setLike] = useState(null);
    useEffect(() => {
        let check = postData.likes.includes(userData.userId) ? true : false;
        setLike(check);
    });

    const handleLike = () =>{
        if(like == true){
            let narr = postData.likes.filter((e) => e != userData.userId);
            database.posts.doc(postData.postId).update({
                likes : narr
            })
        }
        else{
            let narr = [...postData.likes , userData.userId]
            database.posts.doc(postData.postId).update({
                likes : narr
            })
        }

    }



    return (
        <div>
            {
                like != null ?
                    <>
                        {
                            like == true ? <span style={{padding : '1rem' , paddingTop : "0.5rem"}} className="material-icons  like " onClick={handleLike}>
                                favorite
                            </span> : <span style={{padding : '1rem' , paddingTop : "0.5rem"}}className="material-icons  Unlike2 " onClick={handleLike}>
                                favorite
                            </span>
                        }

                    </> :

                    <></>

            }


        </div>
    );
}

export default Like;