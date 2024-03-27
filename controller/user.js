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
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect('/')
    } catch (error) {
        return res.render('signin', {
            error: "Incorrect Email or Password",
        });
    }
    
}

const handleLogoutUser = (req, res) => {
    return res.clearCookie('token').redirect('/');
}

module.exports = {
    handleSignupUser,
    handleSigninUser,
    handleLogoutUser,
}