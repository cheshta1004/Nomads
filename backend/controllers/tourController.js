import Tour from "../models/Tour.js"

export const createTour =async (req,res)=>{
    const newTour=new Tour(req.body)
    try {
        const savedTour=await newTour.save();
        res.status(200).json({success:true,message:"Successfully created",
            data:savedTour})
    } catch (error) {
        res.status(500).json({success:false,message:"Failed"})
    }
}

export const updateTour=async(req,res)=>{
    const id=req.params.id;
    try {
        const updateTour=await Tour.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})
        res.status(200).json({
            success:true,
            message:"Successfully updated",
            data:updateTour,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed updated",
        })
    }
}
export const deleteTour=async(req,res)=>{
    const id=req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Successfully deleted",
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed to delete",
        })
    }
}
export const getSingleTour=async(req,res)=>{
    const id=req.params.id;
    try {
        const tour=await Tour.findById(id);
        res.status(200).json({
            success:true,
            message:"Successful",
            data:tour
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:false,
            message:"Not found",
        })
    }
}
export const getAllTour=async(req,res)=>{
    const page=parseInt(req.query.page)
    console.log(page)
    try {
        const tours=await Tour.find({})
        .skip(page*8)
        .limit(8);
        res.status(200).json({
            success:true,
            count:tours.length,
            message:"Successful",
            data:tours,
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:false,
            message:"Not found",
        })
    }
};

export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize }
        })

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tours,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
};


export const getTourCount=async(req,res)=>{
    try {
        const tourCount=await Tour.estimatedDocumentCount();
        res.status(200).json({
            success:true,
            data:tourCount
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Dailed",
        })
    }
}
export const getFeaturedTour = async (req, res) => {
    try {
        const featuredTours = await Tour.find({ featured: true }).populate('reviews');
        res.status(200).json({
            success: true,
            message: "Successfully retrieved featured tours",
            data: featuredTours,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Failed to retrieve featured tours",
        });
    }
};

