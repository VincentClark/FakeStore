import React, {useState} from "react";
const Nav_Button = ({useRef, title, id, color,hoverColor,backGroundColor,hoverBackgroundColor}) => {
    const [fontColor, setFontColor] = useState (color);
    const [background,setBackground] = useState(backGroundColor);
    function setColors(fColor,bColor){
        setFontColor(fColor);
        setBackground(bColor);
    }
    
    const appStyles = {
        color: `${fontColor}`,
        backgroundColor: `${background}`
        
    };
    
    return (
        <a
        style={appStyles}
        onMouseEnter = {() => setColors(hoverColor,hoverBackgroundColor)}
        onMouseLeave = {() => setColors(color,backGroundColor)}
        id={id} 
        href={useRef}
        >
        {title}
        </a>
    );
};

Nav_Button.defaultProps = {
    color: 'white',
    hoverColor: 'rgb(253, 253, 253)',
    backGroundColor: 'rgb(70, 70, 70)',
    hoverBackgroundColor: 'rgb(61, 61, 61)'
};

export default Nav_Button;
