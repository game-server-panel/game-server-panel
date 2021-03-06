import React from 'react';

class Navbar extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            userEmail: null,
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Game Server Panel</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/logout">Logout</a>
                            </li>
                        </ul>                    
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;