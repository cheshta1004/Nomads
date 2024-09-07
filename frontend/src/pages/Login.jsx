import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import axios from 'axios';
import "./login.css"
import LoginPhoto from "../assets/images/Login.jpg"
import LoginTitle from "../assets/images/login-title.png"
import { Link ,useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
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
            const response = await axios.post('https://nomads-backend.onrender.com/login', credentials);
            alert("Login successful");
            navigate('/home')
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('Login failed!');
        }
        try {
            const response = await axios.post('https://nomads-backend.onrender.com/login', credentials);
            const { token } = response.data;
            sessionStorage.setItem('token', token);
            navigate('/home'); 
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed! Please check your credentials.');
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


// // import React, { useState } from "react";
// // import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
// // import { Link } from 'react-router-dom';
// // import '../styles/login.css';
// // import loginImg from '../assets/images/login.png';
// // import userIcon from '../assets/images/user.png';

// // const Login = () => {
// //     const [credentials, setCredentials] = useState({
// //         email: undefined,
// //         password: undefined        
// //     });

// //     const handleChange = e => {
// //         setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
// //     };

// //     const handleClick = e => {
// //         e.preventDefault();
// //         // Add your login logic here
// //     };

// //     return (
// //         <section>
// //             <Container>
// //                 <Row>
// //                     <Col lg='8' className="m-auto">
// //                         <div className="logo_container d-flex justify-content-between">
// //                             <div className="login__img">
// //                                 <img src={loginImg} alt="Login" />
// //                             </div>
// //                             <div className="login__form">
// //                                 <div className="user">
// //                                     <img src={userIcon} alt='User' />
// //                                 </div>
// //                                 <h2>Login</h2>
// //                                 <Form onSubmit={handleClick}>
// //                                     <FormGroup>
// //                                         <input type="text" placeholder="Email" required id="email" onChange={handleChange} />
// //                                     </FormGroup>
// //                                     <FormGroup>
// //                                         <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
// //                                     </FormGroup>
// //                                     <Button className="btn secondary__btn auth__btn" type="submit" style={{color:"white"}}>Login</Button>
// //                                 </Form>
// //                                 <p>Don't have an Account? <Link to="/register">Register</Link></p>
// //                             </div>
// //                         </div>
// //                     </Col>
// //                 </Row>
// //             </Container>
// //         </section>
// //     );
// // };

// // export default Login;

// import React, { useState } from "react";
// import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/login.css';
// import loginImg from '../assets/images/login.png';
// import userIcon from '../assets/images/user.png';

// const Login = () => {
//     const [credentials, setCredentials] = useState({
//         email: '',
//         password: ''
//     });

//     const navigate = useNavigate();

//     const handleChange = e => {
//         setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
//     };

//     const handleClick = async e => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(credentials)
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 alert('Login successful');
//                 // Redirect to a different page after successful login
//                 navigate('/dashboard');
//             } else {
//                 alert(data.error);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <section>
//             <Container>
//                 <Row>
//                     <Col lg='8' className="m-auto">
//                         <div className="logo_container d-flex justify-content-between">
//                             <div className="login__img">
//                                 <img src={loginImg} alt="Login" />
//                             </div>
//                             <div className="login__form">
//                                 <div className="user">
//                                     <img src={userIcon} alt='User' />
//                                 </div>
//                                 <h2>Login</h2>
//                                 <Form onSubmit={handleClick}>
//                                     <FormGroup>
//                                         <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
//                                     </FormGroup>
//                                     <button type="submit">login</button>
//                                    </Form>
//                                 <p>Don't have an Account? <Link to="/register">Register</Link></p>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </section>
//     );
// };

// export default Login;
