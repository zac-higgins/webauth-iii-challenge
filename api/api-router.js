const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

const projectName = 'webauth-iii-challenge';

router.get('/', (req, res) => {
    res.json({ message: `Project: ${projectName} is up and running!` })
})

module.exports = router;