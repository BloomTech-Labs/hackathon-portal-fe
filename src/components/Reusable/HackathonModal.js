import React from 'react';

const HackathonModal = () => {

    return (
        <div className='backdrop'>
            <div className={`modal ${modal ? 'showModal' : '' }`}></div>
        </div>
    )
}


export default HackathonModal;