
import React from "react";
import "../styles/home.css";
import {Container,Row,Col}from 'reactstrap'
import heroImg from"../assets/images/hero-img01.jpg"
import heroImg02 from"../assets/images/hero-img02.jpg"
import heroVideo from "../assets/images/heroVideo.mp4"
import WorldImg from "../assets/images/world.png"
import experienceImg from "../assets/images/experience.png"
import Subtitle from "./../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import Collage from "../components/Image-gallery/Collage.jsx";
import Testimonial from "../components/Testimonial/Testimonial.jsx";
import Newsletter from "../shared/Newsletter.jsx";
import { Button} from 'reactstrap'
const Home =()=>{
  
    return <>
    <section>
        <Container>
            <Row>
            <div className="Home">
            <div className="videoBg">
             <video src={heroVideo} autoPlay loop muted alt="" controls></video>
          
            </div>
            <div className="popularPlaces">
                <div className="conten"></div>
                <h3>Popular Places</h3>
                <div className="images flex">     
                </div>
            </div>
        </div>
        <SearchBar/>
            </Row>
        </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='3'>
                <h5 className="services__subtitle">What we serve</h5>
                <h2 className="services__title">We offer our best services</h2>
                </Col>
                <ServiceList/>
            </Row>
        </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='12' className="mb-5"> 
                    <Subtitle subtitle={'Explore'}/>
                    <h2 className="featured__tosur-title">
                        Our Featured Tours
                    </h2>
                </Col>
                <FeaturedTourList/>
            </Row>
        </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='6'>
                <div className="experience__content">
                    <Subtitle subtitle={'Experience'}/>
                    <h2>With our all experience <br/>We will serve you</h2>
                    <p>Imagine embarking on a journey where every click leads to a new adventure.
                    Tour and travel websites are the digital gateways to exploration, connecting wanderlust-filled
                     hearts with captivating destinations.
                      From the snow-capped peaks of the Himalayas to 
                     the sun-kissed beaches of Bali, these platforms offer a kaleidoscope of experiences. Imagine embarking on a journey where every click leads to a new adventure.
                    Tour and travel websites are the digital gateways to exploration, connecting wanderlust-filled
                     hearts with captivating destinations  kaleidoscope of experiences. Imagine kaleidoscope of experiences. 
                     </p>
                </div>
                <div className="counter__wrapper d-flex align-items-center gap-5">
                    <div className="counter__box">
                        <span>12k+</span>
                        <h6>Successfull Trip</h6>
                    </div>
                    <div className="counter__box">
                        <span>2k+</span>
                        <h6>Regular Clients</h6>
                    </div>
                    <div className="counter__box">
                        <span>15</span>
                        <h6>Years Experience</h6>
                    </div>
                </div>
                </Col>
                <Col lg="6">
                <div className="experience__img">
                    <img src={experienceImg} alt="" />
                </div>
                </Col>
            </Row>
        </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                <Subtitle subtitle={"Gallery"}/>
                <h2 className="gallery__title">
                    visit our customers tour gallery
                </h2>
                </Col>
                <Col lg='12'>
                   <Collage/>
                </Col>
            </Row>
        </Container>
    </section>
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                <Subtitle subtitle={'Fans Love'}/>
                <h2 className="testimonial__title">What our fans say about us</h2>
                </Col>
                <Col lg='12'>
                <Testimonial/>
                </Col>
            </Row>
        </Container>
    </section>
    <Newsletter/>
    </>
}

export default Home;