import User from '../schema/db.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();


export const signup = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = bcryptjs.hashSync(password, 10);
    console.log(hashedpassword)
    const newUser = new User({ username, email, password: hashedpassword });
    try {
        await newUser.save();
        res.status(201).json({
            msg: "user is created succesfully"
        })
    } catch (err) {
        next(err);
    }
};
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validuser = await User.findOne({ email: email });
        if (!validuser) {
            return next(errorhandler(401, 'User not found'));
        }
        const validpassword = bcryptjs.compareSync(password, validuser.password);
        if (!validpassword) {
            return next(errorhandler(401, 'Invalid Credentials'));
        }
        const token = jwt.sign({ id: validuser._id },
            process.env.JWT_SECRET
        )
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

export const signout=async(req,res,next)=>{
    res.clearCookie('access_token').status(200).json('Signout success!');
}