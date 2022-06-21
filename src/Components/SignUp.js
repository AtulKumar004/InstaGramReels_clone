import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {AuthProvider} from '../Context/AuthContext';
// import { makeStyles } from '@material-ui/core/styles';

import instalogo from '../Assets/Instagram.jpg';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import './Signup.css';
import {Link} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {database , storage} from '../firebase';

// import {useHistory} from 'react-router-dom';
export default function SignUp() {
  // let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);

  const handleClick = async () => {
    if (file == null) {
      setError("Please upload profile image first");
      setTimeout(() => {
        setError('')
      }, 2000)
      return;
    }
    try {
      setError('');
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
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
        setLoading(false)
        return;
      }
      function fn3(snapshot) {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullname: name,
            profileUrl: url,
            createdAt: database.getTimeStamp()

          })

        })
        setLoading(false);
        

      }



    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError('')
      }, 2000)


    }

  }

  return (

    <div className='signupWrapper'>
      <div className='signupCard'>

        <Card >
          <CardActionArea>
            <div className='Insta-logo'>
              <img src={instalogo} />
            </div>
            <CardContent>
              <Typography className='text1' variant="subtitle" component="div" margin="dense">
                Sign up to see photos and video from your friends
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField id="outlined-basic" label="Email" variant="outlined" margin='dense' size='small' fullWidth={true} value = {email} onChange= {(e) => setEmail(e.target.value)} />
              <TextField id="outlined-basic" label="Password" variant="outlined" margin='dense' size='small' fullWidth={true} value = {password} onChange= {(e) => setPassword(e.target.value)}/>
              <TextField id="outlined-basic" label="Full Name" variant="outlined" margin='dense' size='small' fullWidth={true} value = {name} onChange= {(e) => setName(e.target.value)}/>
              <Button variant="outlined" color='secondary' size="small" fullWidth={true} margin="dense" component="label">Upload profile Image
                <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
              </Button>
            </CardContent>

          </CardActionArea>
          <CardActions>
            <Button variant="contained" color='primary' size="small" fullWidth={true} disabled={loading} onClick={handleClick}>
              Sign Up
            </Button>

          </CardActions>
          <CardContent>
            <Typography className='text1' variant="subtitle" component="div" margin="dense">
              By signing up, you agree to our Terms and conditios ans Cookies policy
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" className='card2' size="small" margin="dense">
          <CardContent>
            <Typography className='text1' variant='subtitlel' component='div'>
              Having an account ?  <Link to="/Login" style={{ textDecoration: 'none' }}>Login</Link>
            </Typography>
          </CardContent>
        </Card>

      </div>
    </div>

  );
}
