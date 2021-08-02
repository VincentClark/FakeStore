
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
            <li>
              <NavButton
                key={ELEMENT.id}
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
  ],
  color: "white",
  hoverColor: "rgb(240, 240, 240)",
  backGroundColor: "rgb(70, 70, 70)",
  hoverBackgroundColor: "rgb(61, 61, 61)",
  bgColor: "rgb(70,70,70)",
};

export default NavBar;
