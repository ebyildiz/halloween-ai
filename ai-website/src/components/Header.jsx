import headerLogo from "../assets/images/halloween-logo.png"

export default function Header() {
    return(
        <header className="header-component">
            <img className="header-logo" src={headerLogo} />
            <h1 className="app-title">Halloween Costume Generator</h1>
            
        </header>
    )
}