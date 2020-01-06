// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';

// import { getHackathons, FETCH_HACKERS } from '../actions/actions';

// const Events = (props) => {

//   let events = [
//     {
//       name: 'Hackathon event'
//     },
//     {
//       name: 'Hackathon event 2'
//     }
//   ];

//     // useEffect(() => {
//     //     props.getHackathons();
//     //     console.log(props.hackers);
//     //   }, []);

//     //   if (props.isFetching) {
//     //     return <h2>Loading Events...</h2>;
//     //   }

//       return(
//             <div>
//                 {props.error && <p>{props.error}</p>}
//                 {events.map(e => (
//                   <div className='event'>
//                     <img className="eventImage" src='https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/111239456/original/36b18829fd273c87ea74e1c112137e21ba6a4530/create-pixel-art-of-any-kind.png'></img>
//                     <div className="eventName">{e.name}</div>
//                   </div>
//                 ))}
//             </div>
//       );
// }

// const mapStateToProps = state => {
//     return {
//         hackathons: state.hackathons,
//       isFetching: state.isFetching,
//       error: state.error
//     };
//   };

// export default connect(mapStateToProps,
//     { getHackathons }
//   )(Events);

  
import React from 'react';

//Search Function for the Organizer Dashboard
const searchFunction = () => {
    // var input, filter, ul, li, a, i, txtValue;
    // input = document.getElementById("searchInput");
    // filter = input.value.toUpperCase();
    // ul = document.getElementById("myUL");
    // li = ul.getElementsByTagName("li");
    // for (i = 0; i < li.length; i++) {
    //     a = li[i].getElementsByTagName("a")[0];
    //     txtValue = a.textContent || a.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //         li[i].style.display = "";
    //     } else {
    //         li[i].style.display = "none";
    //     }
    // }
}



const Events = (props) => {
    return(
        <div className='eventList'>
            {props.events.map(e => {
                return(
                <div className='event'>
                    <img className='eventImage' src={e.url}></img>
                    <div className='eventName'>{e.name}</div>
                </div>
                )
            })}
        </div>
    )
};

export default Events;