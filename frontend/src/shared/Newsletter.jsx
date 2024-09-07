import React from "react";
import "./newsletter.css";
import {Container,Col,Row} from 'reactstrap';
import maleTourist from "../assets/images/male-tourist.png";
const Newsletter=()=>{
    return<section className="newsletter">
        <Container>
            <Row>
                <Col lg='6'>
                <div className="newsletter__content">
                    <h2>Subscribe now to get useful information.</h2>
                    <div className="newsletter__input">
                        <input type="email" placeholder="Enter your Email"/>
                        <button className="btn newsletter__btn" style={{background:'#D21404', color:'white'}}> Subscribe</button>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, laboriosam error.
                         Porro, ipsum suscipit exercitationem, quod rem aliquam blanditiis magni quam dolorem repellendus neque,
                          delectus corrupti. Accusantium ad aut temporibus.</p>
                </div>
                </Col>
                <Col lg='6'>
                <div className="newsletter__img">
                    <img src={maleTourist} alt="" />
                </div>
                </Col>
            </Row>
        </Container>
    </section>
      
}

export default Newsletter;