import React from "react";
import ServiceCard from "./ServiceCard"
import{Col} from "reactstrap"
import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData=[
    {
        imgUrl:weatherImg,
        title:"Calculate Weather",
        desc:"This is discription1"
    },
    {
        imgUrl:guideImg,
        title:"Best Tour Guide",
        desc:"This is discription2"
    },
    {
        imgUrl:customizationImg,
        title:"Customization",
        desc:"This is discription3"
    }
]
const ServiceList=()=>{
    return <>{
        servicesData.map((item,index)=>
            <Col lg="3" key={index}>
            <ServiceCard item={item}/>
            </Col>
        )
    }
    </>
}

export default ServiceList;