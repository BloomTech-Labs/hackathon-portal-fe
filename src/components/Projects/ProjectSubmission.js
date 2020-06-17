import React, { useState } from 'react'

import { useDispatch } from 'react-redux';

import { submitProject, updateProject } from '../../actions/actions';
import moment from "moment";

import '../../sass/hackathonModel/hackathonModel.scss'
import '../../sass/projectSubmission/projectSubmission.scss'

const ProjectSubmission = ({ hackathon }) => {
    const [modal, setModal] = useState(false)
    const [projectDetails, setProjectDetails] = useState({
        project_id: hackathon?.project?.project_id,
        github_url: '',
        deployed_url: '',
        video_url: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const dispatch = useDispatch();
    const currentDate = new Date().toString();

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleBackgroundClick = e => {
        if (e.target === e.currentTarget) toggleModal();
    }

    const handleChange = e => {
        setProjectDetails({
            ...projectDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(submitProject(projectDetails, hackathon?.project?.project_id))
        dispatch(updateProject(hackathon?.project?.project_id, { submitted: true }))
        setActiveStep(1)
        setSubmitted(true)
        console.log(projectDetails)
    }

    const submitButtonRender = () => {
        // Upcoming for submit button
        if (moment(hackathon?.start_date).isAfter(currentDate)) {
            return null;
        }
        // past for submit button
        if (moment(hackathon?.end_date).isBefore(currentDate)) {
            if (hackathon?.project?.submitted === true) {
                return (
                    <p>Submitted</p>
                )
            } else {
                return null;
            }
        }

        if (hackathon?.project?.submitted === true || submitted === true) {
            return (
                <p>Submitted</p>
            )
        }
        if (hackathon?.user_hackathon_role === 'organizer') {
            return null;
        }
        return (
            <button className='submit-button' onClick={() => {
                setModal(true)
            }}>Submit</button>
        )
    }

    return (
        <div >
            <div className={`backdrop ${modal ? '' : 'hideModal'}`} onClick={handleBackgroundClick}>
                <div className='modal project-submission-modal' >
                    {activeStep === 0 && (

                        <div className='project-submission-content'>
                            <h3>Submit Hackathon Project</h3>
                            <h4 className='hackathon-name'>Hackathon name: <span>{hackathon.hackathon_name}</span> </h4>
                            <h4 className='project-name'>Project name: <span>{hackathon?.project?.title} </span></h4>
                            <form className='submission-form' onSubmit={handleSubmit}>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Main submission url'
                                    name='github_url'
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Additional url'
                                    name='deployed_url'
                                    onChange={handleChange}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Video upload'
                                    name='video_url'
                                    onChange={handleChange}
                                   
                                />
                                <div className='submission-buttons'>
                                    <button onClick={e => {
                                        e.preventDefault()
                                        setModal(false)
                                    }} className='cancel-button'>Cancel</button>
                                    <button type='submit' className='submission-button'>Submit</button>
                                </div>
                            </form>
                        </div>
                    )
                    }

                    {activeStep === 1 && (
                        <div className='success-container'>
                            <h2 className='success-header'>You have successfully submitted your project.</h2>
                            <div className='ok-div'>
                                <button className='ok-button' onClick={() => { setModal(false) }}> OK </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {submitButtonRender()}

        </div>
    )
}

export default ProjectSubmission;