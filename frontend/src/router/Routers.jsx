import React from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import PrivateRoute from "../pages/PrivateRoute";
import TourDetails from "./../pages/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import About from "../pages/About";
import Hotels from '../pages/hotels';
import Destinations from "../pages/Destinations"
import PlacesList from "../components/PlacesList.js"
import DashBoard from "../pages/DashBoard.jsx";
import Contact from "../pages/Contact.jsx";
import BookingPage from "../components/BookingPage.js"
const Routers =()=>{
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home'/>}/>
            <Route path='/home' element={<Home/>}/>
            
            <Route path="/tours" element={<PrivateRoute><Tours /></PrivateRoute>} />
            {/* <Route path='/tours' element={<Tours/>}/> */}
            
            <Route path='/tours/:id' element={<TourDetails/>}/>
            <Route path="/hotels" element={<Hotels />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/thankyou' element={<ThankYou/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/tours/search' element={<SearchResultList/>}/>
            <Route path="/destinations"  element={<Destinations/>}/>
            <Route path="/placesList"  element={<PlacesList/>}/>
            <Route path="/Dashboard" element={<DashBoard/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/booking" element={<BookingPage />} />
        </Routes>
    )
}

export default Routers;