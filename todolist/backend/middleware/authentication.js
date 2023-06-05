import { verifyToken } from "../util/jwtUtil.js";

const authentication = (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        res.render(
            "error",
            {
                status: 401,
                message: "Unauthorized"
            }
        )
    }
    const user = verifyToken(token);

    if (!user) {
        res.render(
            "error",
            {
                status: 401,
                message: "Unauthorized"
            }
        )
    }

    req.user = user;
    res.cookie("token", token, { maxAge: process.env.EXPIRES_IN * 1000 })
    next();
}

export { authentication }