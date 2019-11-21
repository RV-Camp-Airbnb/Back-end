const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secrets');

const Owners = require('../owners/owners-model');
router.use(express.json());

router.post('/register', (req, res) => {

    let owners = req.body;
    const hash = bcrypt.hashSync(owners.password, 8);
    owners.password = hash;

    Owners.addOwners(owners)
        .then(addedOwner => {
            res.status(201).json(addedOwner);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error registering, Try again'
            });
        })
})


router.post('/login', (req, res) => {
    const { ownername, password } = req.body;

    Owners.findByOwner({ ownername })
        .first()
        .then(owner => {
            if (owner && bcrypt.compareSync(password, owner.password)) {
                const token = getToken(owner);
                res.status(200).json({ message: 'Logged In', token });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            };
        }).catch(err => {
            res.status(500).json({ message: 'Error logging in, Try again' });
        })
});

router.get('/', async (req, res, next) => {
    try {
        const Owners = await Owners.get();
        res.status(200).json(owners);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;

    Owners.findById(id)
        .then(owner => {
            if (owner) {
                res.status(200).json(owner)
            } else {
                res.status(404).json({
                    message: "Could not get that owner..."
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: "The owner could not be retrieved. Please try again."
            })
        })
})

router.post('/', (req, res) => {
    const Owner = req.body;
    Owners.addOwner(Owner)
        .then(owner => {
            res.status(200).json(owner);
        })
        .catch(error => {
            res.status(500).json({
                message: 'error saving owner information'
            });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body
    Owners.updateOwner(req.params.id, changes)
        .then(owner => {
            res.status(200).json(owner);
        })
        .catch(error => {
            res.status(500).json({
                message: 'error getting the Owners data'
            })
        })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    Owners.removeOwner(id)
        .then(owner => {
            if (owner) {
                res.status(201).json(owner)
            } else {
                res.status(404).json({
                    message: 'Owner not found'
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

function getToken(owner) {
    const payload = {
        subject: owner.id,
        username: owner.ownerName,
        // jwtid: user.id
    };
    const options = {
        expiresIn: '2h',
    };
    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;