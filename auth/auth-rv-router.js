const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const landOwner = require('../routes/landOwner/landOwner-model')
const secret = require('../config/secrets');

const restricted = require('../auth/restricted-middleware');


//Rv User Register
router.post('/register', (req, res) => {

    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 15);
    user.password = hash;

    Users.addUsers(user)
        .then(addedUser => {
            res.status(201).json(addedUser);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error registering, Try again' });
        })
})


//LandOwner Register
router.post('/register', (req, res) => {

    let landOwner = req.body;
    const hash = bcrypt.hashSync(landOwner.password, 15);
    landOwner.password = hash;

    landOwner.addLandOwner(landOwner)
        .then(addedLandOwner => {
            res.status(201).json(addedLandOwner);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error registering, Try again' });
        })
})


//RV User Login
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


//LandOwner Login
router.post('/login', (req, res) => {
    const { landOwnerName, password } = req.body;

    LandOwners.findByUser({ landOwnerName })
        .first()
        .then(landOwner => {
            if (landOwner && bcrypt.compareSync(password, landOwner.password)) {
                const token = getToken(landOwner);
                res.status(200).json({ message: 'Logged In', token });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            };
        }).catch(err => {
            res.status(500).json({ message: 'Error logging in, Try again' });
        })
});


function getToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        jwtid: user.id
    };
    const options = {
        expiresIn: '2h',
    };
    return jwt.sign(payload, secret.jwtSecret, options);
}

function getToken(landOwner) {
    const payload = {
        subject: landOwner.id,
        landOwnerName: landOwner.landOwnerName,
        jwtid: landOwner.id
    };
    const options = {
        expiresIn: '2h',
    };
    return jwt.sign(payload, secret.jwtSecret, options);
}

// router.get('/users', restricted, (req, res) => {
//     Users.find()
//         .then(users => {
//             res.json({ loggedInUser: req.username, users });
//         })
//         .catch(err => res.send(err));
// });

//Getting Users

router.get('/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            // console.log(users)
            res.json({ loggedInUser: req.username, users })
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({ message: 'Error getting users' });
        })
})


//Getting LandOWners
router.get('/landOwner', restricted, (req, res) => {
    LandOwners.find()
        .then(landOwners => {
            // console.log(users)
            res.json({ loggedInLandOwner: req.landOwnerName, landOwners })
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({ message: 'Error getting landOwners' });
        })
})

module.exports = router;