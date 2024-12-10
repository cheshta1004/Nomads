import React from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import About from "../pages/About";
import Hotels from '../pages/hotels';
import Destinations from "../pages/Destinations"
import PlacesList from "../components/PlacesList.jsx"
import DashBoard from "../pages/DashBoard.jsx";
import Contact from "../pages/Contact.jsx";
import BookingPage from "../components/BookingPage.js"
import Blog from "../pages/BlogPge.jsx";
const Routers =()=>{
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home'/>}/>
            <Route path='/home' element={<Home/>}/>
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
            <Route path="/Blogs" element ={<Blog/>}/>
        </Routes>
    )
}

export default Routers;