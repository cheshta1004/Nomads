import User from "../models/User.js"

export const createUser =async (req,res)=>{
    const newUser=new User(req.body)
    try {
        const savedUser=await newUser.save();
        res.status(200).json({success:true,message:"Successfully created",
            data:savedUser})
    } catch (error) {
        res.status(500).json({success:false,message:"Failed"})
    }
}

export const updateUser=async(req,res)=>{
    const id=req.params.id;
    try {
        const updateUser=await User.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})
        res.status(200).json({
            success:true,
            message:"Successfully updated",
            data:updateUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Failed updated",
        })
    }
}
export const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try {
        await User.findByIdAndDelete(id);
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
export const getSingleUser=async(req,res)=>{
    const id=req.params.id;
    try {
        const user=await User.findById(id);
        res.status(200).json({
            success:true,
            message:"Successful",
            data:user
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:false,
            message:"Not found",
        })
    }
}
export const getAllUser=async(req,res)=>{
    
    console.log(page)
    try {
        const users=await User.find({})
        
        res.status(200).json({
            success:true,
            message:"Successful",
            data:users,
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:false,
            message:"Not found",
        })
    }
}