const jwt = require("jsonwebtoken")
const SECRET_KEY = 'RESTAPI'

const auth ((req , res , next)=>{
    try {
        let token = res.headers.authorization

        if(token)
        {
            token =  token.split(" ")[1];

            let user =  jwt.verify(token , SECRET_KEY )
        }

        else
        {
            res.status(401).json({message:'Unauthorized User'})
        }

        next();
    } catch (error) {
        console.log('error')
        res.status(401).json({message:'Unauthorized User'})
    }
}) 

module.exports =  auth;