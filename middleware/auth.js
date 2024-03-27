const { validateUserToken } = require("../service/auth");

const checkAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookieName];
        try {
            if (!tokenCookie) return next();

            const userPayload = validateUserToken(tokenCookie)
            req.user = userPayload;

        } catch (error) {

        }
        return next();
    }
}

module.exports = {
    checkAuthenticationCookie,
}