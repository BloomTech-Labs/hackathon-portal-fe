import React from 'react';
import Loader from "react-loader-spinner";


// this component is now used for all instances of loader
// to change global loader spinner simply change props here

export default function Load() {
    return (
        <div className='loader-container' style={{display: 'flex', justifyContent:'center'}}>
            <Loader id='loader' type="Rings" color="#311B92" height={100} width={100} />
        </div>
    )
}