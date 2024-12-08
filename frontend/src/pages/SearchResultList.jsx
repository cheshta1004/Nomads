import React,{useState} from "react";
import CommonSection from './../shared/CommonSection';
import { Container,Row,Col } from "reactstrap";
import Newsletter from "../shared/Newsletter"
import{useLocation} from "react-router-dom";
import DestinationCard from '../shared/DestinationCard.jsx';
const SearchResultList=()=>{
    const location=useLocation();
    const [data]=useState(location.state);
    console.log(data);
    return(
        <>
        <CommonSection title={"Tour Search Result"}/>
        <section>
            <Container>
            <Row>
                        {data.length === 0 ? (
                            <h4 className="text-center">No destinations found</h4>
                        ) : (
                            data?.map((destination) => (
                                <Col lg="3" className="mb-4" key={destination._id}>
                                    <DestinationCard destination={destination} />
                                </Col>
                            ))
                        )}
                    </Row>
            </Container>
        </section>
        <Newsletter/>
        </>
    )
}

export default SearchResultList;



    