import express from "express";
import auth from "../../middleware/auth.js";
const router = express.Router();
import User from "../../models/User.js";
import Jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from 'bcryptjs'


// @route   GET api/auth
// @desc    Test route
// @access  Public
router.route('/').get(
    auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }

);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        // Return jsonwebtoken
        const playload = {
            user: {
                id: user.id
            }
        }

        Jwt.sign(
            playload,
            process.env.jwt_Secrect,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            })

    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message)
    }

});

export default router;