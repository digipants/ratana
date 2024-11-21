import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import {errorhandler} from './error.js';

dotenv.config();

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(errorhandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorhandler(403, 'Token is not valid!'));
        req.user = user;
        next();
    });
};