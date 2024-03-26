const User = require('../model/user.js')

const handleSignupUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    await User.create({
        fullName,
        email,
        password,
    })

    return res.redirect('/')
}

const handleSigninUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.matchPassword(email, password);

    console.log('user', user)
    return res.redirect('/')
}

module.exports = {
    handleSignupUser,
    handleSigninUser,
}