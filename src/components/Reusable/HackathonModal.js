import React, { useState } from 'react';
import '../../sass/hackathonModel/hackathonModel.scss'

import CreateHackathon from '../Hackathon/CreateHackathon'


const HackathonModal = () => {
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleBackgroundClick = e => {
        if (e.target === e.currentTarget) toggleModal();
    }

    return (
        <>
            <div className={`backdrop ${modal ? '' : 'hideModal'}`} onClick={handleBackgroundClick}>
                <div className='modal'>

                    <CreateHackathon toggleModal={toggleModal} />

                </div>
            </div>
            <button className='dashboard-buttons' onClick={() => toggleModal()}>Create a hackathon</button>
        </>
    )
}

export default HackathonModal;