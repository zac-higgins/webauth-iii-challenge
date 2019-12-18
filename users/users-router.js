const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const Users = require('./users-model.js');

router.get('/', restricted, (req, res) => {
    const { department } = req.token
    if (req.token.department === 'admin') {
        Users.getUsers()
            .then(users => {
                res.json(users);
            })
    } else {
        Users.getUsersBy({ department })
            .then(users => {
                res.json(users);
            })
            .catch(err => res.send(err));
    }
});

module.exports = router;