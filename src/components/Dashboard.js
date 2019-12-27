import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import SvgIcon from '@material-ui/icons/Add';

import Events from './Events';

const Dashboard = () => {

    const searchFunction = () => {
        console.log('searching');
    }

    return (
        <div className='dashboard'>
            <h3>Dashboard</h3>
            <input type="text" onKeyUp={searchFunction} placeholder="Search"></input>
            <div className='eventsList'>
                <div className='event' onClick={() => console.log('create event button was clicked')}>
                    <SvgIcon className='eventImage' id='addIcon' component={AddIcon} style={{ fontSize: 300 }}></SvgIcon>
                    <div className='eventName' id='createEventButtonText'>Create Event</div>
                </div>
                <Events></Events>
            </div>
        </div>
    )
}

export default Dashboard