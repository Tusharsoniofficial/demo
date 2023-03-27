const dotenv=require('dotenv');
dotenv.config();
const validate = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (token) {
            if (token === process.env.Auth_token)
            {
                console.log("token", token);
                next(); 
            }
            else {
                res.send({ message: "token is not authorized", status: 0 });    
            }
        }
        else {
            res.send({ message: "no token provided", status: 0 });
        }
    }
    catch (e) {
        console.log("Error", e);
        throw new Error(e);
    }
};

module.exports = validate;