import User from '../schema/db.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { z } from 'zod'
import { errorHandler } from '../utils/error.js';

const userSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[\W_]/, { message: "Password must contain at least one special character." })
});

dotenv.config();


export const signup = async (req, res, next) => {
    try {
        const validationResult = userSchema.parse(req.body);
        if (!validationResult) {
            return res.status(400).josn({
                errors: validationResult.error.errors.map((err) => err.message)
            })
        }

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const hashedpassword = bcryptjs.hashSync(password, 10);
        if (!username) {
            return next(errorHandler(401, "Username is required!"))
        }
        if (!email) {
            return next(errorHandler(401, "email is required!"));
        }
        if (!password) {
            return next(errorHandler(401, "password is required!"))
        }
        console.log(hashedpassword)
        const newUser = new User({ username, email, password: hashedpassword });

        await newUser.save();
        res.status(201).json({
            msg: "user is created succesfully"
        })
    } catch (error) {
        next(error)
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validationResult = userSchema.parse(req.body);
        if (!validationResult) {
            return res.status(400).josn({
                errors: validationResult.error.errors.map((err) => err.message)
            })
        }
        const validuser = await User.findOne({ email: email });
        if (!validuser) {
            return next(errorHandler(401, "user not found"));
        }
        const validpassword = bcryptjs.compareSync(password, validuser.password);
        if (!validpassword) {
            return next(errorHandler(401, "invalid password"))
        }
        const token = jwt.sign({ id: validuser._id },
            process.env.JWT_SECRET
        );
        const expiryDate = new Date(Date.now() + 3600000);
        const { password: hashedpassword, ...userData } = validuser._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate
        })
            .status(200)
            .json(userData);

    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id },
                process.env.JWT_SECRET
            );
            const { password: hashedpassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 36000000);
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate
            })
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photoURL,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
}