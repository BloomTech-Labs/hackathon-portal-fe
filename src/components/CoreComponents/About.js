import React from 'react' 

import '../../sass/about.scss'

 const About = () => {
     return (
         <div className='about'>
              <div className="hero">
               <img className='hero-left' src='https://picsum.photos/300/300'/>
               <div className="hero-right">
                  <h1>We scratch, build and play together</h1>
                  <p>Hackathon Portal is the hub for everything hackathon. Whether you are coordinating a hackathon, judging aproject, or participating, Hakathon Portal is the best wayu to stay up to date on the event's actvity</p>
                  <button>Contact Us</button>
               </div>
            </div>
            <div className="bottom">
               <div className="bottom-left">
                  <h1>Fostering creativity and innovationeam definiebas reformidans, exerci persecuti</h1>
                  <div className='values'>
                      <p>Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum</p>
                      <p>At nam minimum ponderum. Est audiam animal molestiae te. Ex duo eripuit mentitum.</p>
                  </div>
                  
               </div>
               <img className='bottom-right' src='https://picsum.photos/300/300'/>
            </div>
         </div>
     )
 }

 export default About;