require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
// const {v4: uuidv4} = require('uuid');
// const {setUser} = require('../service/auth');

async function handleUserSignup(req,res){

    try{
        const {name, email, password} = req.body;

        // checking if user exits or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

        // hashing password before saving it
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(`Hashed password ${hashedPassword}`);

        // If new user store its information
        await User.create({
            name,
            email,
            password: hashedPassword,
        });
    
        return res.redirect('/');
    } catch(error){
        console.log(`Error: ${error}`);
        return res.status(500).json({Error: 'Internal server error'});
    }
}

async function handleUserLogIn(req,res){

    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        

        if(!user) return res.render('login',{
            error: 'Invalid Username or Password',
        });

        // compare password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.render('login',{
                error: 'Invalid Username or Password',
            });
        }

        return res.redirect('/');
    } catch(error){
        console.log(`Error: ${error}`);
        return res.status(500).json({Error: 'Internal server error'});
    }
}


module.exports = {
    handleUserSignup,
    handleUserLogIn,
}