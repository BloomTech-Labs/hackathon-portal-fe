import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// ACTIONS
import { getSpecificHackathon } from "../../actions/actions";
import { Typography, Avatar, Checkbox, FormControlLabel } from "@material-ui/core";

const ProjectList = props => {
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon);
  const isFetching = useSelector(state => state.isFetching);
  const [projects, setProjects] = useState([]);
  const [filterProjects, setFilterProjects] = useState([]);
  const [filter, setFilter] = useState({
    front_end_spots: false,
    back_end_spots: false,
    ux_spots: false,
    data_science_spots: false,
    ios_spots: false,
    android_spots: false
  });
  const { front_end_spots, back_end_spots, ux_spots, data_science_spots, ios_spots, android_spots } = filter;

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

  const handleCheckboxChange = e => {
    if(e.target.checked === true){
      setFilter({...filter, [e.target.name]:e.target.checked});
      setFilterProjects([...filterProjects, e.target.name])
    }else if(e.target.checked === false){
      setFilter({...filter, [e.target.name]:e.target.checked})
      setFilterProjects(filterProjects.filter(element => {
        return element !== e.target.name
      }))
    }
  }

  useEffect(() => {
    filterProjects.map(item => {
      setProjects(hackathon.projects.filter(element => {
        return element[item] > 0 && element.is_approved
      }))
    })
  }, [filterProjects])

  console.log(projects)

  const reset = () => {
    setProjects(hackathon.projects)
  }
  

  // const handlesChanges = e => {
  //   e.target.checked ? setFilterProjects([...filter, e.target.name]) : setFilterProjects(filters.filter(item => {
  //     return item !== e.target.name
  //   }))
  // }

  console.log(filterProjects)

  if (!hackathon) {
    return <div>Loading...</div>;
  }

  console.log(filter)

  return (
    <div>
      <button onClick={()=>reset()}>RESET</button>
      <FormControlLabel
        control={<Checkbox name='ux_spots' checked={filter.ux_spots} onChange={handleCheckboxChange}/>}
        label="ux"
      />
      <FormControlLabel
        control={<Checkbox name='ios_spots' checked={filter.ios_spots} onChange={handleCheckboxChange}/>}
        label="ios"
      />
      <FormControlLabel
        control={<Checkbox name='front_end_spots' checked={filter.front_end_spots} onChange={handleCheckboxChange}/>}
        label="front_end"
      />
      <FormControlLabel
        control={<Checkbox name='back_end_spots' checked={filter.back_end_spots} onChange={handleCheckboxChange}/>}
        label="back_end"
      />
      <FormControlLabel
        control={<Checkbox name='data_science_spots' checked={filter.data_science_spots} onChange={handleCheckboxChange}/>}
        label="data_science"
      />
      <FormControlLabel
        control={<Checkbox name='android_spots' checked={filter.android_spots} onChange={handleCheckboxChange}/>}
        label="android"
      />
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
