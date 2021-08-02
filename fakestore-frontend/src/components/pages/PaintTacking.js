import React, { useState, useEffect } from 'react';

const painLevelArray = [1,2,3,4,5,6,7,8];
class PainTracking extends React.Component {
    constructor (props){
        super (props);
        this.state ={
            isLoaded: false,
            painLevelArray: painLevelArray,
        
        };

    
   
       // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        console.log("Loaded");
        //this.arrayPlanter(painLevelArray, "painlevel")
    }


    /*
    put functions here
    { arrayPlanter(this.painLevelArray, "painlevel") }
    */

    render() {
        return(
            <>
                <div className="container-fluid">
                    <h1>Temp Map Soulti </h1>
                </div>
                <div className="container-fluid" id="level">
                   
                </div>
                
            </>
        );
        }
}


export default PainTracking;