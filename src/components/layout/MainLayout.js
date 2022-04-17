import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function MainLayout(props) {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const fetchUser = () => {
        const token = localStorage.getItem("auth");
        axios.get(process.env.REACT_APP_BACKEND_API + "profile", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setUser(res.data.user);
        }).catch(err => {
            console.log('Err', err);
        })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return <>
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        Instagram
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {!user ?
                                <>
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/sign-up"} className="nav-link">
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                                :
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {user?.fullName}
                                    </a>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdownMenuLink"
                                    >
                                        <li>
                                            <Link to={"/profile"} className="dropdown-item">
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" onClick={handleLogout} >
                                                Logout
                                            </a>
                                        </li>
                                        {/* <li>
                                            <a className="dropdown-item" href="#">
                                                Another action
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Something else here
                                            </a>
                                        </li> */}
                                    </ul>
                                </li>
                            }


                        </ul>
                    </div>
                </div>
            </nav>
            {props.children}
        </>

    </>
}