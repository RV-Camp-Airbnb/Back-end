const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secret = require('../config/secrets');

// added by me
const restricted = require('../auth/restricted-middleware');


router.post('/register', (req, res) => {

    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.addUsers(user)
        .then(addedUser => {
            res.status(201).json(addedUser);
        })
        .catch(err => {
          console.log(err)
            res.status(500).json({ message: 'Error registering, Try again' });
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findByUser({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = getToken(user);
                res.status(200).json({ message: 'Logged In', token });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            };
        }).catch(err => {
            res.status(500).json({ message: 'Error logging in, Try again' });
        })
});

// added by me
router.get('/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      console.log(users)
      res.json(users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error getting users...' });
    });
});

function getToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        // jwtid: user.id
    };
    const options = {
        expiresIn: '2h',
    };
    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;