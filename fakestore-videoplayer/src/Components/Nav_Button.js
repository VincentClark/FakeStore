// import React, { useState } from "react";
const Nav_Button = ({ useRef, title, id }) => {
    //backGroundColor, hoverBackgroundColor (removed props)
    // const [fontColor, setFontColor] = useState(color);
    // const [background, setBackground] = useState(backGroundColor);
    // function setColors(fColor, bColor) {
    //     setFontColor(fColor);
    //     setBackground(bColor);
    // }

    // const appStyles = {
    //     color: `${fontColor}`,
    //     backgroundColor: `${background}`

    // };
    //style moved into css file
    // will remove this once css is in place
    return (
        <a
            className="nav-button"
            id={id}
            href={useRef}
        >
            {title}
        </a>
    );
};

// Nav_Button.defaultProps = {
//     color: 'white',
//     hoverColor: 'rgb(253, 253, 253)',
//     backGroundColor: 'rgb(70, 70, 70)',
//     hoverBackgroundColor: 'rgb(61, 61, 61)'
// };

export default Nav_Button;
