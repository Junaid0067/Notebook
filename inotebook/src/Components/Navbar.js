import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }
    let location = useLocation();
    return (
        <div >
            <nav style={{backgroundColor: "#c5aa6a"}} className="navbar navbar-expand-lg navbar-light navbar-scroll">
                <div className="container-fluid">
                <i className="fa-solid fa-book mx-2"></i>
                    <Link className="navbar-brand" to="/">iNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className= {`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login <i className="fa-solid fa-right-to-bracket"></i></Link>
                        <Link className="btn btn-outline-light mx-2" to="/signup" role="button">Signup <i className="fa-solid fa-user-plus"></i></Link>
                        </form>:<Link onClick={handleLogout} className="btn btn-outline-light mx-2" to="/login" role="button">Logout</Link>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
