import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import SvgIcon from '@material-ui/icons/Add';

const Dashboard = () => {
    let events = [
        {
            name: 'Event1',
            image: 'event2 Image'
        },
        {
            name: 'Event2',
            image: 'event2 Image'
        }
    ]
    return (
        <div className='dashboard'>
            <h3 onClick={console.log("console.log")}>Dashboard</h3>
            <div className='eventsList'>
                {/* the events will show up in this list */}
            </div>
            <div className='createEventButton' onClick={console.log(events)}>
                <SvgIcon id='addIcon' component={AddIcon} style={{ fontSize: 300 }}></SvgIcon>
                <div id='createEventButtonText'>Create Event</div>
            </div>
        </div>
    )
}

export default Dashboard;