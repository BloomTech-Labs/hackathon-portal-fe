import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import SvgIcon from '@material-ui/icons/Add';

const Events = props => {
   return (
      <div className="eventList" id="eventList">
         {props.events.map(e => {
            return (
               <div className="event">
                  <img className="eventImage" src={e.url}></img>
                  <a className="eventName">{e.name}</a>
               </div>
            );
         })}
      </div>
   );
};

export default Events;
