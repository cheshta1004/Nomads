import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import axios from 'axios';
import "./login.css"
import LoginPhoto from "../assets/images/Login.jpg"
import LoginTitle from "../assets/images/login-title.png"
import { Link ,useNavigate} from "react-router-dom";
import { useUserContext } from "../context/userContext";
const Login = () => {
    const navigate = useNavigate();
    const { setUsername } = useUserContext(); 
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', credentials);
            const { token,user } = response.data; // Get the user object containing username
            sessionStorage.setItem('token', response.data.token); // Store token if needed
            sessionStorage.setItem('username', user);
            setUsername(user); 
            alert("Login successful");
            navigate('/home')
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('Login failed!');
        }
        
    };

    return (
        <Container className="login-container" >
            <Row>
            <Col lg='6' className="photo-side">
                    {/* <img src={LoginPhoto} alt="Login Visual" className="login-photo" style={{height:"500px",width:"500px"}} /> */}
                    <img src={LoginPhoto} alt="Login Visual" className="login-photo" 
     style={{ height: "500px", width: "500px", position: "relative", left: "-100px" }} />

            </Col>
                <Col lg='8' className="form-side m-auto">
                <img src={LoginTitle} alt="Login Visual" className="login-photo" />
                    <Form onSubmit={handleClick} className="login-form">
                        <FormGroup>
                            <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                        </FormGroup>
                        <Button type="submit" className="login-button">Login</Button>
                        <p>Don't have an account?<Link to="/register">Register</Link></p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
