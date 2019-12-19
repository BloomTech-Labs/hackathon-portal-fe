import React from 'react';
import{ Link } from 'react-router-dom';

const Homepage = () => {
    return(
        <div className='Homepage'>
            <h3>this is the homepage for now</h3>
            <Link to='/Dashboard'>Dashboard</Link>
        </div>
    )
}

export default Homepage;