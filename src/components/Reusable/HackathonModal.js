import React, { useState } from 'react';
import { textfield } from "@material-ui/core"
const HackathonModal = () => {
   const [modal, setModal] = useState(false)

   const toggleModal = () => {
    setModal(!modal)
    }

    const handleBackgroundClick = e => {
        if(e.target === e.currentTarget) toggleModal();
    }

    return (
        <>
            <div className={`backdrop ${modal ? '' : 'hideModal' }`} onClick={handleBackgroundClick}>
                <div className='modal'>
                    <div className='top-content'>
                        <h3>Create a new hackathon</h3>
                        <div className='Stepper'>
                            <div>1</div>
                            <div>-</div>
                            <div>2</div>
                            <div>-</div>
                            <div>3</div>
                        </div>
                    </div>
                    <form className='middle-content'>
                        <input placeholder='Hackathon name' />
                        <input placeholder='Hackathon url'/>
                        <input placeholder='Hackathon location'/>
                        <textarea placeholder='Hackathon description'/>
                    </form>
                    <div className='bottom-content'>
                        <button>Cancel</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>
            <button onClick={() => toggleModal()}>Create a hackathon</button>
        </>
    )
}

export default HackathonModal;