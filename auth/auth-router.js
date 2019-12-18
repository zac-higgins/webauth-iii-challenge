const bcrypt = require('bcryptjs');
const router = require("express").Router();
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.getUsersBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.json({ message: 'You can checkout any time you like, but you never can leave' })
            } else {
                res.status(200).json({ message: "bye, thanks for playing!" })
            }
        })
    } else {
        res.status(200).json({ message: "You were never here to begin with" })
    }
})

module.exports = router;