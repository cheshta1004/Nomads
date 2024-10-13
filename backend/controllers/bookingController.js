import Booking from "../models/Booking.js"
export const createbooking=async(req,res)=>{
    const newBooking=new  Booking(req.body)
    try{
        const savedBooking=await newBooking.save();
        res.status(200).json({
            success:true,
            message:"Your tour is booked",
            data:savedBooking
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:true,
            message:"Internal Server error",
            data:savedBooking
        })
    }
}

export const getBooking=async(req,res)=>{
    const id=req.params.id
    try {
        const book=await Booking.findById(id);
        res.status(200).json({
            success:true,
            message:"successful",
            data:book,
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success:true,
            message:"not found",
            data:savedBooking
        })
    }
}

export const getAllBooking=async(req,res)=>{

    try {
        const books=await Booking.find();
        res.status(200).json({
            success:true,
            message:"successful",
            data:books,
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success:true,
            message:"internal Server Erroe",
            data:savedBooking
        })
    }
}