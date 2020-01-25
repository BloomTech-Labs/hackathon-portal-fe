import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// ACTIONS
import { getSpecificHackathon } from "../../actions/actions";
import { Typography, Avatar, Checkbox } from "@material-ui/core";

const ProjectList = props => {
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon);
  const isFetching = useSelector(state => state.isFetching);
  const [projects, setProjects] = useState([]);
  const [filterpProjects, setFilterProjects] = useState([]);
  const [filter, setFilter] = useState({
    front_end_spots: false,
    back_end_spots: false,
    ux_spots: false,
    data_science_spots: false,
    ios_spots: false,
    android_spots: false
  })

  useEffect(() => {
    dispatch(getSpecificHackathon(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  console.log(hackathon)

  useEffect(() => {
    if(hackathon){
      setProjects(hackathon.projects)
    }
  }, [hackathon])

  console.log(projects)
  /*
  front_end_spots: 3
  back_end_spots: 1

  ios_spots: 1
  android_spots: 1
  data_science_spots: 1
  ux_spots: 1
  */

  useEffect(() => {
    setFilterProjects()
  }, [filter])

  const filterANY = ((array, role) => {
    setProjects(array.filter(element => {
      return element.role > 0 && element.is_approved
    }))
  })
  const filterUX = ((array, role) => {
    setProjects(array.filter(element => {
      return element.ux_spots > 0 && element.is_approved
    }))
  })
  const filterIOS = ((array, role) => {
    setProjects(array.filter(element => {
      return element.ios_spots > 0 && element.is_approved
    }))
  })
  const filterFE = ((array, role) => {
    setProjects(array.filter(element => {
      return element.front_end_spots > 0 && element.is_approved
    }))
  })
  const filterBE = ((array, role) => {
    setProjects(array.filter(element => {
      return element.back_end_spots > 0 && element.is_approved
    }))
  })
  const filterAND = ((array, role) => {
    setProjects(array.filter(element => {
      return element.android_spots > 0 && element.is_approved
    }))
  })
  const filterDS = ((array, role) => {
    setProjects(array.filter(element => {
      return element.data_science_spots > 0 && element.is_approved
    }))
  })
  const reset = ((array, role) => {
    setProjects(array.filter(element => {
      return element
    }))
  })

  const handleCheckboxChange = name => e => {
    setFilter({...filter, [name]:e.target.checked})
  }

  if (!hackathon) {
    return <div>Loading...</div>;
  }

  console.log(filter)

  return (
    <div>
      <button onClick={()=>filterUX(hackathon.projects)}>UX</button>
      <button onClick={()=>filterIOS(hackathon.projects)}>IOS</button>
      <button onClick={()=>filterFE(hackathon.projects)}>FE</button>
      <button onClick={()=>filterBE(hackathon.projects)}>BE</button>
      <button onClick={()=>filterDS(hackathon.projects)}>DS</button>
      <button onClick={()=>filterAND(hackathon.projects)}>AND</button>
      <button onClick={()=>reset(hackathon.projects)}>RESET</button>
      <Checkbox label='UX' name='ux_spots' checked={filter.ux_spots} onChange={handleCheckboxChange('ux_spots')}>UX</Checkbox>
      <Checkbox onClick={()=>filterIOS(hackathon.projects)}>IOS</Checkbox>
      <Checkbox onClick={()=>filterFE(hackathon.projects)}>FE</Checkbox>
      <Checkbox onClick={()=>filterBE(hackathon.projects)}>BE</Checkbox>
      <Checkbox onClick={()=>filterDS(hackathon.projects)}>DS</Checkbox>
      <Checkbox onClick={()=>filterAND(hackathon.projects)}>AND</Checkbox>
      <Typography variant='h4'>Project List</Typography>
      {!projects ? 
        <Typography variant='h6'>There are no projects posted at this time.</Typography>
        :
        projects.map((project, index) => {
          return(
            project.is_approved && (
              <div key={index} style={{border:'2px solid red', width:'300px'}}>
                <div>
                  <Typography variant='h5' style={{fontWeight:'bold'}}>{project.project_title}</Typography>
                  <Typography variant='body1'>{project.project_description}</Typography>
                </div>
                <div style={{display:'flex', margin:'0 auto'}}>
                  {project.front_end_spots > 0 && (
                    <Avatar style={{background:'none', border:'1px solid green', color:'green'}}>FE</Avatar>
                  )}
                  {project.back_end_spots > 0 && (
                    <Avatar style={{background:'none', border:'1px solid blue', color:'blue'}}>BE</Avatar>
                  )}
                  {project.ux_spots > 0 && (
                    <Avatar style={{background:'none', border:'1px solid orange', color:'orange'}}>UX</Avatar>
                  )}
                  {project.data_science_spots > 0 && (
                    <Avatar style={{background:'none', border:'1px solid purple', color:'purple'}}>DS</Avatar>
                  )}
                  {project.ios_spots > 0 && (
                    <Avatar style={{background:'none', border:'1px solid white', color:'white'}}>IOS</Avatar>
                  )}
                  {project.android_spots > 0 && (
                    <Avatar style={{background:'none', border:'1px solid red', color:'red'}}>AND</Avatar>
                  )}
                </div>
              </div>
          ))
        })
      }
    </div>
  );
};

export default ProjectList;
