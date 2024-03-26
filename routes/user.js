const { Router } = require('express');
const { handleSignupUser, handleSigninUser } = require('../controller/user');
const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin')
});

router.get('/signup', (req, res) => {
    return res.render('signup')
});

router.post('/signup', handleSignupUser);

router.post('/signin', handleSigninUser);

module.exports = router;