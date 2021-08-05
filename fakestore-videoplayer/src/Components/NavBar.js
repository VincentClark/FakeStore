import NavButton from "./Nav_Button";
// REMOE COMMENTS ONCE SECURED
//need to undo this and put everything in to css file
//   color,  hoverColor,  backgroundColor,  hoverBackgroundColor,
// bgColor
const NavBar = ({
  navConfig
}) => {
  return (
    <nav>
      <div className="menu">
        <ul className="menu_list">
          {navConfig.map((ELEMENT) => (
            <li key={ELEMENT.id.toString() + "li"} id={ELEMENT.id.toString() + "lid"}>
              <NavButton
                key={ELEMENT.id.toString()}
                id={ELEMENT.key}
                title={ELEMENT.title}
                useRef={ELEMENT.ref}

              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// NavBar.defaultProps = {
//   navConfig: [
//     {
//       id: 1,
//       title: "Home",
//       ref: "/",
//       component: "HompePage",
//     }
//   ],
//   color: "white",
//   hoverColor: "rgb(240, 240, 240)",
//   backGroundColor: "rgb(70, 70, 70)",
//   hoverBackgroundColor: "rgb(61, 61, 61)",
//   bgColor: "rgb(70,70,70)",
// };

export default NavBar;
