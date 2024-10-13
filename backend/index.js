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

mongoose.connect("mongodb://127.0.0.1:27017/signupDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
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
    console.log('Received signup data:', req.body);
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
        // res.status(201).json({ message: 'User registered successfully' });
        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            user: { username } // Return the username in the response
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
        // res.status(200).json({ message: 'Login successful', token });
        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: { username: user.username } // Return the username in the response
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/tour', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// import express from 'express';
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import User from './models/User.js'; 
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import tourRoute from './routes/tour.js';
// import userRoute from './routes/user.js';
// import reviewRoute from './routes/review.js';
// import bookingRoute from './routes/booking.js'

// dotenv.config();
// const app = express();
// const port=process.env.PORT ||5000;
// const corsOptions={
//     origin:true,
//     credentials:true
// }
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());
// app.use('/tours',tourRoute);
// app.use('/users',userRoute);
// app.use('/review',reviewRoute);
// app.use('/booking',bookingRoute)

// mongoose.connect('mongodb://127.0.0.1:27017/signupDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


// const secretKey = 'MySecretKey';


// const generateToken = (user) => {
//     return jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1hr' });
// };

// const verifyToken = (token) => {
//     try {
//         return jwt.verify(token, secretKey);
//     } catch (error) {
//         return null;
//     }
// };

// const authenticateJWT = async (req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ error: 'Access denied, no token provided' });
//     }

//     const verified = verifyToken(token);
//     if (!verified) {
//         return res.status(401).json({ error: 'Invalid token' });
//     }

//     // Check if the user exists in the database
//     const user = await User.findById(verified.id);
//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }

//     req.user = user;
//     next();
// };

// app.post('/register', async (req, res) => {
//     console.log('Received signup data:', req.body);

//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword
//         });

//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error during registration:', error); 
//         res.status(500).json({ error: 'Server error, registration failed' });
//     }
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         const token = generateToken(user);
//         res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });
// app.get('/tour', authenticateJWT, (req, res) => {
//     res.status(200).json({ message: 'This is a protected route', user: req.user });
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

