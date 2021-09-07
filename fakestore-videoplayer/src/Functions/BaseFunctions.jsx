import React from 'react'

function Test(bar){
    return(
        <div>
            <h1>{bar}</h1>
            <p>
                This is the base functions file.
            </p>
        </div>
    )
}
const urli = () =>{
    const currenthost = window.location.host;
    const currentport = window.location.port;
    const currentprotocal = window.location.protocol;   
    if (currentport === "3000") {
        return 'http://localhost:8080/videos/videostub'
    } else {
        return (`${currentprotocal}//${currenthost}/videos/videostub`);
    }
}
const urliPath = () =>{
    const currenthost = window.location.host;
    const currentport = window.location.port;
    const currentprotocal = window.location.protocol; 
    if (currentprotocal === "http:") {
        console.log("if","http")
      return 'http://localhost:8080/videos'
    } else {
        console.log("else","else")
      return `${currentprotocal}//${currenthost}${currentport}/videos/`;
    }
  };
const urlPath = (relativePath) =>{
    const currenthost = window.location.host;
    const currentport = window.location.port;
    const currentprotocal = window.location.protocol; 
    if (currentport === "3000") {
        console.log("if",`${currentprotocal}//localhost:8080/videos/${relativePath}`)
      return `${currentprotocal}//localhost:8080/videos/${relativePath}`
    } else {
      return `${currentprotocal}//${currenthost}${currentport}/videos/${relativePath}`;
    }
}


export {Test, urli,urliPath, urlPath}