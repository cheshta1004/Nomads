import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tour.js';
import userRoute from './routes/user.js';
import reviewRoute from './routes/review.js';
import bookingRoute from './routes/booking.js';
import hotelRoute from './routes/hotels.js'
import DestinationRoute from './routes/DestinationRoutes.js'
import Payment from './models/Payment.js';
import CafeAdvRoute from './routes/CafeAdv.js';
import PaymentCafeAdv from './models/PaymentCafeAdv.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/tours', tourRoute);
app.use('/users', userRoute);
app.use('/review', reviewRoute);
app.use('/booking', bookingRoute);
app.use('/api/hotels',hotelRoute);
app.use('/api/destinations',DestinationRoute);
app.use('/api/CafeAdv',CafeAdvRoute);
app.get('/api/payment/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userRecord = await Payment.find({userId:userId});
        if (!userRecord) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json({  userRecord });
    } catch (error) {
        console.error("Error retrieving user:", error.message);
        res.status(500).json({ error: "Server error." });
    }
});

app.post('/api/payment', async(req, res) => {
    console.log(req.body);
    try {
        const {
          paymentId,
          userId,
          hotelId,
          amount,
          bookingDetails,
        } = req.body;
    
        const newPayment = new Payment({
          paymentId,
          userId,
          hotelId,
          amount,
          bookingDetails,
          status: "Success", 
          createdAt: new Date(),
        });
    
        await newPayment.save();
    
        res.status(200).json({ success: true, message: "Payment saved successfully" });
      } catch (error) {
        console.error("Error saving payment:", error);
        res.status(500).json({ success: false, message: "Failed to save payment" });
      }
  });
  
  app.get('/api/paymentCafeAdv/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userRecord = await PaymentCafeAdv.find({ userId: userId });
        if (!userRecord || userRecord.length === 0) {
            return res.status(404).json({ error: "User not found or no payments found." });
        }
        res.json({ userRecord });
    } catch (error) {
        console.error("Error retrieving user payments:", error.message);
        res.status(500).json({ error: "Server error." });
    }
});
app.post('/api/paymentCafeAdv', async (req, res) => {
    console.log(req.body);
    try {
        const {
          paymentId,
          userId,
          CafeAdvId,
          amount,
          bookingDetails,
        } = req.body;
    
        const newPaymentCafeAdv = new PaymentCafeAdv({
          paymentId,
          userId,
          CafeAdvId,
          amount,
          bookingDetails,
          status: "Success",  
          createdAt: new Date(),
        });
    
        await newPaymentCafeAdv.save();
    
        res.status(200).json({ success: true, message: "Payment saved successfully" });
    } catch (error) {
        console.error("Error saving payment:", error);
        res.status(500).json({ success: false, message: "Failed to save payment" });
    }
});



mongoose.connect("mongodb://127.0.0.1:27017/signupDB" ).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const secretKey = process.env.SECRET_KEY || 'MySecretKey';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1hr' });
};

const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }
    try {
        const verified = jwt.verify(token, secretKey);
        const user = await User.findById(verified.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = generateToken(newUser); 
        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            user: { username } 
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Server error, registration failed' });
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }


        const token = generateToken(user);
        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: { 
                _id: user._id, 
                username: user.username,
                email: user.email 
            } 
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


app.post("/api/transport-cost", async (req, res) => {
    const { transportMode, pickupLocation, dropLocation } = req.body;
    const baseFare = transportMode === "car" ? 5 : 2; 
    const costPerKm = transportMode === "car" ? 2 : 1; 
    try {
      const distanceInKm = await getDistance(pickupLocation, dropLocation);
      const cost = baseFare + distanceInKm * costPerKm;
      res.json({ cost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to calculate transport cost" });
    }
  });
  
  const getDistance = async (origin, destination) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=YOUR_API_KEY`
    );
    const data = await response.json();
    return data.routes[0]?.legs[0]?.distance?.value / 1000 || 0; // Return distance in km
  };
  
app.get('/tour', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});