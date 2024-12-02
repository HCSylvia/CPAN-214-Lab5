import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import session from 'express-session';
import initializePassport from './passport.js';
import authRoutes from './routes/auth.js';

// CPAN-214 Modern Web Technologies
// Written by Sylvia Rose
// Lab 5


const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Uses passport logic from passport.js
initializePassport();

mongoose.connect('mongodb://localhost:27017/LoginAuth').then(async () => {
  console.log('Connected to MongoDB');
});

app.use('/api/auth', authRoutes);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});