import NavButton from "./Nav_Button";

const NavBar = ({
  navConfig,
  bgColor,
  color,
  hoverColor,
  backgroundColor,
  hoverBackgroundColor,
}) => {
  return (
    <nav>
      <div className="menu" style={{ backgroundColor: bgColor }}>
        <ul>
          {navConfig.map((ELEMENT) => (
            <li key={ELEMENT.id.toString() + "li"} id={ELEMENT.id.toString()+"lid"}>
              <NavButton
                key={ELEMENT.id.toString()}
                id={ELEMENT.key}
                title={ELEMENT.title}
                useRef={ELEMENT.ref}
                color={color}
                hoverColor={hoverColor}
                backGroundColor={backgroundColor}
                hoverBackgroundColor={hoverBackgroundColor}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  navConfig: [
    {
      id: 1,
      title: "Home",
      ref: "/",
      component: "HompePage",
    },
    {
      id: 2,
      title: "Registration",
      ref: "/register",
      component: "Registration",
    },
    {
      id: 3,
      title: "Garden Tracker",
      ref: "/gardentracker",
      component: "Garden Tracker",
    },
    {
      id: 4,
      title: "Video Shorts",
      ref: "/videoShorts",
      component: "/Video Shorts",
    },
  ],
  color: "white",
  hoverColor: "rgb(240, 240, 240)",
  backGroundColor: "rgb(70, 70, 70)",
  hoverBackgroundColor: "rgb(61, 61, 61)",
  bgColor: "rgb(70,70,70)",
};

export default NavBar;
