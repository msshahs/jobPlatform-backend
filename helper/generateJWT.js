const jwt = require("jsonwebtoken");

const generateJWTToken = (email, userId) => {
    return jwt.sign(
        {
            email: email,
            id: userId,
        },
        'LINKEDINKEY6603',
        {
            algorithm: 'HS256',
        }
    );
};

module.exports = generateJWTToken;
