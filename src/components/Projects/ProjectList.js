// A page that shows a list of all approved project ideas in a hackathon

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import moment from 'moment';

// ACTIONS
import { getSpecificHackathon } from "../../actions/actions";
import { Typography, Avatar, FormControlLabel, Radio, RadioGroup, FormHelperText, makeStyles, Card } from "@material-ui/core";

// STYLES
import { style } from '../../MUI-Styles/projectListStyles';
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner';

import '../../sass/projectList/projectList.scss';

// modal from material ui
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// modal styles
import { modalStyle } from '../../MUI-Styles/organizerProjectList';

// create a project component
import CreateProject from '../Projects/CreateProject';

const useStyles = makeStyles(theme => style);


const ProjectList = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon);
  const isFetching = useSelector(state => state.isFetching);
  const [projects, setProjects] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [approvedProjects, setApprovedProjects] = useState(true);
  const [registered, setRegistered] = useState({ registered: false, project_id: 0 })
  const { user } = useAuth0();
  const currentDate = new Date().toString();

  const [modal, setModal] = useState(false)

  useEffect(() => {
    dispatch(getSpecificHackathon(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleCheckboxChange = e => {
    setFilterBy(e.target.value)
  }


  useEffect(() => {
    if (hackathon) {
      setProjects(hackathon.projects)
      setApprovedProjects(hackathon.projects.filter(element => { return element.is_approved }))
    }
    if (hackathon && hackathon.projects) {
      hackathon.projects.map(item => {
        if (item.participants.find(element => {
          return element.user_id === user.id
        })) {
          setRegistered({ registered: true, project_id: item.project_id })
        }
      })
    }

  }, [hackathon])
  useEffect(() => {
    if (hackathon && hackathon.projects) {
      if (hackathon.admins.find(element => {
        return element.user_id === user.id
      })) {
        setRegistered({ registered: true })
      }
    }
  }, [hackathon])

  useEffect(() => {
    if (hackathon && !filterBy) {
      setProjects(hackathon.projects)
    } else if (hackathon) {
      setProjects(hackathon.projects.filter(element => {
        return element[filterBy] > 0
      }))
    }
  }, [filterBy])

  if (isFetching || !hackathon) {
    return <Loader type="Rings" color="#311B92" height={100} width={100} />;
  }

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <div className={`${classes.projectListWrapper} projectListWrapper`}>
      <h4 style={{ color: '#311B92' }} onClick={() => props.history.push(`/hackathon/${hackathon.id}`)}>Back</h4>
      <Typography className={`${classes.projectsHeader} projectsHeader`} variant='h4'>{hackathon.name} project list</Typography>

      <div className={classes.contentContainer}>
        <RadioGroup value={filterBy} onChange={handleCheckboxChange} className={classes.radioGroup}>
          <h3>Filter</h3>
          <div className={`${classes.middleContent} middle-content`}>
            <div className={`${classes.middleLeftContent} middle-left-content`}>
              <div className={classes.showAll}>
                <FormControlLabel
                  control={<Radio style={{ color: 'black' }} />}
                  value=''
                  label="Show all"
                />
              </div>
              <div className={`${classes.filterRadios} filter-radio`}>

                <div className={`${classes.topRadios} top-radios`}>
                  <FormControlLabel
                    control={<Radio style={{ color: 'black' }} />}
                    value='front_end_spots'
                    label="Front-end"
                    style={{ color: 'black' }}
                  />
                  <FormControlLabel
                    control={<Radio style={{ color: 'black' }} />}
                    value='ux_spots'
                    label="UX design"
                    style={{ color: 'black' }}
                  />
                  <FormControlLabel
                    control={<Radio style={{ color: 'black' }} />}
                    value='ios_spots'
                    label="iOS"
                    style={{ color: 'black' }}
                  />
                </div>
                <div className={`${classes.bottomRadios} bottom-radios`}>
                  <FormControlLabel
                    control={<Radio style={{ color: 'black' }} />}
                    value='back_end_spots'
                    label="Back-end"
                    style={{ color: 'black' }}
                  />
                  <FormControlLabel
                    control={<Radio style={{ color: 'black' }} />}
                    value='data_science_spots'
                    label="Data science"
                    style={{ color: 'black' }}
                  />

                  <FormControlLabel
                    control={<Radio style={{ color: 'black' }} />}
                    value='android_spots'
                    label="Android"
                    style={{ color: 'black' }}
                  />
                </div>
              </div>
            </div>
            {!moment(hackathon.end_date).isBefore(currentDate) ?
              <Button className={`${classes.button} button`} onClick={handleModal}>Add a project idea</Button> : null}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.addProjectModal}
              open={modal}
              onClose={handleModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
            >
              <Fade in={modal}>
                <CreateProject handleClose={handleModal} />
              </Fade>
            </Modal>
          </div>
        </RadioGroup>
        {!hackathon.projects ?
          <Typography variant='h6'>This hackathon currently has no projects</Typography>
          :
          !projects[0] && filterBy !== '' ?
            <Typography variant='h6'>There are no projects with the chosen role available</Typography>
            :
            !approvedProjects[0] ?
              <Typography variant='h6'>This hackathon currently has no projects</Typography>
              :
              projects[0] ?
                <div className={classes.cardContainer}>
                  {projects.map((project, index) => {
                    return (
                      project.is_approved && (
                        <Card key={index} className={`${classes.projectCards} project-cards`}
                          onClick={() => props.history.push(`/hackathon/${hackathon.id}/projects/${project.project_id}`)}>
                          <div>
                            <Typography variant='h5' className={classes.projectTitle}>{project.project_title}</Typography>
                            <Typography noWrap={true} variant='body2' className={classes.projectDescription}>{project.project_description}</Typography>

                          </div>
                          <div>
                            <div style={{ display: 'flex' }}>
                              {project.front_end_spots > 0 && (
                                <Avatar style={{ background: 'none', border: '1px solid #232323', color: '#232323' }}>FE</Avatar>
                              )}
                              {project.back_end_spots > 0 && (
                                <Avatar style={{ background: 'none', border: '1px solid #232323', color: '#232323' }}>BE</Avatar>
                              )}
                              {project.ux_spots > 0 && (
                                <Avatar style={{ background: 'none', border: '1px solid #232323', color: '#232323' }}>UX</Avatar>
                              )}
                              {project.data_science_spots > 0 && (
                                <Avatar style={{ background: 'none', border: '1px solid #232323', color: '#232323' }}>DS</Avatar>
                              )}
                              {project.ios_spots > 0 && (
                                <Avatar style={{ background: 'none', border: '1px solid #232323', color: '#232323' }}>IOS</Avatar>
                              )}
                              {project.android_spots > 0 && (
                                <Avatar style={{ background: 'none', border: '1px solid #232323', color: '#232323' }}>AND</Avatar>
                              )}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                              <p className={classes.viewMore}>View More</p>
                              {!project?.submitted ? (
                                registered.project_id === project?.project_id ? (
                                  <FormHelperText style={{ color: '#007C5D', fontSize: '16px', marginTop: '0px' }}>Participating</FormHelperText>
                                ) : false
                              ) : (
                                  registered.project_id === project?.project_id ? (
                                    <FormHelperText style={{ color: '#232323', fontSize: '16px', marginTop: '0px' }}>Submitted</FormHelperText>
                                  ) : false
                                )}
                            </div>
                          </div>
                        </Card>
                      ))
                  })}
                </div>
                :
                <Typography variant='h6'>This hackathon currently has no projects</Typography>
        }
      </div>
    </div >
  );
};

export default ProjectList;
//test