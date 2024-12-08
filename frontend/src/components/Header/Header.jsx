import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import "./header.css";
import {useUserContext} from "../../context/userContext"
const nav__links = [
    { path: '/home', display: "Home" },
    { path: '/about', display: "About" },
    { path: '/destinations', display: "Destinations" }, 
    {path:'/placesList',display:"Places List"},
    {path:'/DashBoard',display:"Dash Board"},
    {path:'/Contact', display:"Contact Us"}
];

const Header = () => {
    const headerRef = useRef(null);
    const { username, setUsername } = useUserContext();

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.remove('sticky__header');
            }
        });
    };
    useEffect(() => {
        stickyHeaderFunc();
        return () => {
            window.removeEventListener('scroll', stickyHeaderFunc); // Cleanup listener
        };
    }, []);
  

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token'); // Remove token if needed
        setUsername(''); // Clear username state
    };

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper d-flex align-items-center justify-content-between">
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="navigation">
                            <ul className="menu d-flex align-items-center gap-5">
                                {
                                    nav__links.map((item, index) => (
                                        <li className="nav__item" key={index}>
                                            <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ""}>
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="nav__right d-flex align-items-center gp-4">
                            {username ? (
                                <div className="username-display">
                                    <span>{username.username}</span>
                                
                                    <Button className="btn primary__btn" onClick={handleLogout}>Logout</Button>
                                </div>
                            ) : (
                                <div className="nav_btns d-flex align-items-center gp-4">
                                    <Button className="btn secondary__btn" style={{ marginRight: "10px", marginLeft: "20px" }}>
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button className="btn primary__btn">
                                        <Link to="/register">Register</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
