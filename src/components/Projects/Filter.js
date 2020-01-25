import React from 'react';

const FilterProjects = () => {

  const filterUX = ((array, role) => {
    return  array.filter(element => {
      return element.role > 0
    })
  })

  return (
    <div>Filter


    </div>
  )
};

export default FilterProjects;