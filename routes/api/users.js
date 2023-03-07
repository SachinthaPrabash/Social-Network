import express from "express";
import { check, validationResult } from "express-validator";
import bcrypt from 'bcryptjs'
import User from "../../models/User.js";
import md5 from 'md5'
import Jwt from "jsonwebtoken";



const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }
        const avatar = `http://www.gravatar.com/avatar/${md5(email)}.jpg?s=200?r=pg?d=mm`

        user = new User({
            name, email,
            avatar,
            password
        })
        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save()

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