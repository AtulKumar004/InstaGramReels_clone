import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { database, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import LinearProgress from '@mui/material/LinearProgress';


function Upload(userData) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = async(file) => {
    //we will first check whether the file is null or not.
    if (file == null) {
      setError("Please select a file first.");
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    // check size of file , file size should not be more than 100mb
    if (file.size / (1024 * 1024) > 100) {
      setError("The file size should be less then 100MB");
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    let uid = uuidv4();
    setLoading(true);
    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on('state_changed', fn1, fn2, fn3);

    function fn1(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress} done.`)

    }
    function fn2(error) {
      setError(error);
      setTimeout(() => {
        setError('')
      }, 2000);
      setLoading(false);
      return;
    }

    function fn3(snapshot) {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);
        let obj = {
          likes: [],
          comments: [],
          pid: uid,
          pUrl: url,
          uName: userData.user.fullname,
          uProfile: userData.user.profileUrl,
          userId: userData.user.userId,
          createdAt: database.getTimeStamp()

        }
        database.posts.add(obj).then(async (ref) => {
          let res = await database.users.doc(userData.user.userId).update({
            postIds: userData.user.postIds != null ? [...userData.user.postIds, ref.id] : [ref.id]
          });
        }).then(() => {
          setLoading(false);
        }).catch((err) => {
          setError(err)
          setError(err)
          setTimeout(() => {
            setError('')
          }, 2000)
          setLoading(false)
        })
      })
    }

  }
  return (
    <div >
      {
        error != "" ? <Alert severity="error">{error}</Alert> :
          <>
            <input type="file" accept="video/*" id="upload-input" style={{ display: 'none' }} onChange={(e) => handleChange(e.target.files[0])} />
            <label htmlFor='upload-input'>
              <Button variant='outlined' color="secondary" disabled={loading} component="span">Upload Video</Button>
            </label>
            { loading && <LinearProgress color="secondary" />}


          </>
      }


    </div>
  )
}

export default Upload