const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse')

exports.register = async (req, res, next) => {
    // const {firstName, lastName, email, password, role, phone, address} = req.body;
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.create({
            firstName, lastName, email, password
        });

        sendToken(user, 201, res);
        console.log("registertation successful");
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("please provide email and password", 400))
    }
    else {

        try {
            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                return next(new ErrorResponse("user not found", 401))
            }
            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                return next(new ErrorResponse("password not matched", 401))
            }
            else {
                sendToken(user, 200, res);
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token })
}
