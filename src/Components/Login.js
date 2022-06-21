import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';

import instalogo from '../Assets/Instagram.jpg';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import './Login.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import bg from '../Assets/insta.png'
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import {Link} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {

    const store = useContext(AuthContext)
    // console.log(store);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    // const history = useHistory();
    const {login} = useContext(AuthContext);
    const handleClick = async()=>{
        try {
            setError('')
            setLoading(true);
            const res = await login(email,password);
            console.log("Loged In");
            setLoading(false);
            // <Link to ="/" className='Link'  style={{textDecoration : 'none'}}></Link>
            // document.getElementsByClassName("Link").click()
        } catch (error) {
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false);
            // return;
            
        }
    }
    return (
        <div className='LoginWrapper'>
            <div className='imgcard' style={{ backgroundImage: 'url('+bg+')', backgroundSize: 'cover' }}>
                <div className='car'>
                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={5}
                        // step={3}
                        naturalSlideWidth={238}
                        naturalSlideHeight={423}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image src={img1} /></Slide>
                            <Slide index={1}><Image src={img2} /></Slide>
                            <Slide index={2}><Image src={img3} /></Slide>
                            <Slide index={3}><Image src={img4} /></Slide>
                            <Slide index={4}><Image src={img5} /></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>

            <div className='LoginCard'>

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
                            <TextField id="outlined-basic" label="Email" variant="outlined" margin='dense' size='small' fullWidth={true} value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" margin='dense' size='small' fullWidth={true} value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <Typography className='text2' color="primary" variant="subtitle" component="div" margin="dense">
                                Forget Password
                            </Typography>
                        </CardContent>

                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" color='primary' size="small" fullWidth={true} onClick={handleClick} disabled={loading} >
                            Sign In
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
                            Have not an account ? <Link to ="/Signup" style={{textDecoration : 'none'}}>Signup</Link>
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </div>

    );
}
