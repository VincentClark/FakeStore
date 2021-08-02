import "../App.css"
const Header = ({title}) => {
    return (
        <div className = "container-fluid">
        <header className = "header">
            <h2>{title}</h2>
        </header>
        </div>
        
    )
}

export default Header

