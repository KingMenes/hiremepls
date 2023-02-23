import jwt from 'jsonwebtoken'
import User from './models/userModel.js';

const secret = process.env.JWT_SECRET
const expiresIn = 604800



export const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        {
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

export const restoreUser = (req, res, next) => {
    // token parsed from cookies
    console.log('cookies------------------------', req.cookies)
    const { token } = req.cookies;
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            const user = await User.findById(id);
            req.user = {
                _id: user.id,
                username: user.username,
                email: user.email,
            }
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

export const requireAuth = [
    restoreUser,
    function (req, _res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
];


// module.exports = { setTokenCookie, restoreUser, requireAuth };
