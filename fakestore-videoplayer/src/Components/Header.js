import "../App.css"
const Header = ({title}) => {
    return (
        <div className = "container-fluid">
        <header className = "header">
            <h1>{title}</h1>
        </header>
        </div>
        
    )
}

export default Header

