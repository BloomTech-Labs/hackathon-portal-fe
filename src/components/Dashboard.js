import React from 'react';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <h3>Dashboard</h3>
            <div className='eventsList'>
                <div class='createEventButton' onClick={console.log('create event button clicked')}>Create Event</div>
            </div>
        </div>
    )
}

export default Dashboard;