import express from 'express';
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/api/users.js'
import postsRoutes from './routes/api/posts.js'
import profileRoutes from './routes/api/profile.js'
import authRoutes from './routes/api/auth.js'

dotenv.config();
const app = express();

//conect db
connectDB();

//init Middleware
app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.send('API Runnbing'));

//Define Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/profile', profileRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));