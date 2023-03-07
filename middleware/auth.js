import Jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    //get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    //verify token
    try {
        const decode = Jwt.verify(token, process.env.jwt_Secrect);

        req.user = decode.user;
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

export default auth 