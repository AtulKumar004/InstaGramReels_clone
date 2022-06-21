import React from 'react'
import ReactDOM from 'react-dom'
import './Videos.css'
// import video1 from "../Video/v.mp4"
// import img from "../Assets/img1.jpg";
function Videos(props) {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
    console.log("click");
  }

  const handleScroll = (e) =>{
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if(next){
      next.scrollIntoView();
      e.target.muted = true;
    }
  }
  
  return (
    
    
    <video src={props.src} onEnded = {handleScroll} className = "video-styling" muted = "muted" onClick={handleClick} controls >
    </video>
     
  )
}

export default Videos;