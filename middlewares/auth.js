const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {

    // It reads the JWT token stored in the user's cookies.
    // This assumes you're setting the token in a cookie called token during login.
    const token = req.cookies.token;

    if(!token){
        return res.redirect('/login');
    }

    try{
        const decoded = jwt.verify(token,  process.env.SECRET_JWT_KEY);
        req.user = decoded;
        next();
    } catch(error){
        console.log("JWT verification failed:", error);
        return res.redirect('/login');
    }
}

module.exports = isAuthenticated;