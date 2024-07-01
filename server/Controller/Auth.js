const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helper");

router.post("/register", async (req, res) => {

    const {email, password, username} = req.body;

    // check for user existance
    const user = await User.findOne({ email: email });
    if (user) {
        return res
            .status(403)
            .json({ error: "A user with this email already exists" });
    }

    // Create a new user 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
        email,
        password: hashedPassword,
        username,
    };
    const newUser = await User.create(newUserData);
    //console.log(newUserData);

    //create the token to return to the user
    const token = await getToken(newUser);
    const userToReturn = { ...newUser.toJSON(), token };

    //console.log(userToReturn);
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});


router.post("/login", async (req, res) => {

    const {email, password} = req.body;

    // check for user 
    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    //console.log(user);

    // check for the correct password 
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(403).json({err: "Invalid password credentials"});
    }

    // return a token to the user.
    const token = await getToken(user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});


module.exports = router;