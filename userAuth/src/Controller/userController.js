const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'RESTAPI'

const signup = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        // Existing User
        const existingUser = await userModel.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json('User already exist');
        }
        // Hashed Password
        const hashedPass = await bcrypt.hash(password, 10)

        // Creation of User

        const result = await userModel.create({
            email: email,
            password: hashedPass,
            username: username
        })

        // Generate Token (JWT)

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)

        res.status(201).json({ user: result, token: token })

    } catch (error) {

        console.log(error)

        res.status(500).json({ message: 'Something went wrong' })

    }

}


const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Existing User
        const existingUser = await userModel.findOne({ email: email })

        if (!existingUser) {
            return res.status(400).json('User not found');
        }
        
        const matchPass = await bcrypt.compare(password,existingUser.password)

        if(!matchPass){
            return res.status(400).json({message:"Password doesn't match"})
        }
        const token = jwt.sign({ email: existingUser.email, id:existingUser._id }, SECRET_KEY)

        res.status(201).json({ user: existingUser, token: token })
 

    } catch (error) {

        console.log(error)

        res.status(500).json({ message: 'Something went wrong' })

    } 

}



module.exports = { signin, signup }