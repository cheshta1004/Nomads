import React, { useState ,useCallback, useContext} from "react";
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import axios from 'axios';
import "./login.css"
import RegisterPhoto from "../assets/images/register.jpg"
import RegisterTitle from "../assets/images/registerTitle.png"
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from './../context/AuthContext.js'
import {BASE_URL} from './../utils/config.js';

const Register = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    });
    const {dispatch}=useContext(AuthContext)
    const [emailError, setEmailError] = useState('');

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const validateEmail = email => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const handleClick = async e => {
        e.preventDefault();
        if (!validateEmail(credentials.email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError('');
        try {
            const response = await axios.post('http://localhost:5000/register', credentials);
            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error('There was an error registering!', error);
            alert('Registration failed!');
        }
    };
    
    // const handleClick = async (e) => {
    //     e.preventDefault();
      
    //     // const userData = {
    //     //   username: 'exampleUser', // Example data, replace with actual input values
    //     //   password: 'examplePassword',
    //     //   email: 'example@example.com'
    //     // };
      
    //     try {
    //       const res = await fetch(`${BASE_URL}/auth/register`, {
    //         method: 'POST',
    //         headers: {
    //           'content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(credentials), // Send user data in the request body
    //       });
    //       const result=await res.json();
    //       // Check if the response is ok
    //       if (!res.ok) {
    //         alert(result.message)
    //       }
    //       dispatch({type:'ReGISTER_SUCCESS'})
    //       navigate('/login')
    //     //   const data = await res.json();
    //     //   console.log("Registration successful", data);
          
    //     } catch (error) {
    //       alert(error.message);
    //     }
    //   };
      
    return (
        <Container className="login-container">
            <Row>
                <Col lg='6' className="photo-side">
                    <img src={RegisterPhoto} alt="Login Visual" className="login-photo"
                        style={{ height: "500px", width: "500px", position: "relative", left: "-100px" }} />
                </Col>
                <Col lg='8' className="form-side m-auto">
                    <img src={RegisterTitle} alt="Login Visual" className="login-photo" />
                    <Form onSubmit={handleClick} className="login-form">
                        <FormGroup>
                            <input type="text" placeholder="Username" required id="username" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        </FormGroup>
                        <FormGroup>
                            <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                        </FormGroup>
                        <Button type="submit" className="login-button">Register</Button>
                        <p>Already have an account?<Link to="/login">Login</Link></p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
