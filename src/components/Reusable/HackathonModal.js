import React, { useState } from 'react';
import { TextField } from "@material-ui/core"
import '../../sass/hackathonModel/hackathonModel.scss'

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
                    <div>
                        <div className='modal-top'>
                            <h3>Create a new hackathon</h3>

                        </div>
                        <form className='modal-middle'>
                            <TextField required varient='filled' placeholder='Hackathon Name' />
                            <TextField required varient='filled' placeholder='Hackathon location' />
                            <TextField varient='filled' placeholder='Hackathon url' />
                            <TextField required multiline rows='5' placeholder='Hackathon description' />
                        </form>
                        <div className='modal-bottom'>
                            <button className='cancel-button'>Cancel</button>
                            <button className='next-button'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => toggleModal()}>Create a hackathon</button>
        </>
    )
}

export default HackathonModal;