const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secrets');



const LandOwners = require('../landOwner/landOwner-model')
router.use(express.json())

// added by eralp
router.get('/:id', (req, res) => {
  const { id } = req.params;

  LandOwners.findById(id)
    .then(listing => {
      console.log(listing)
      if (listing) {
        res.status(200).json(listing )
      } else {
        res.status(404).json( {message: "Could not get that listing..."})
      }
    }).catch(err => {
      console.log(err)
      res.status(500).json({ error: "The listing could not be retrieved. Please try again." })
    })
})

router.get('/', async (req, res, next) => {
    try {
        const landOwners = await LandOwners.get();
        res.status(200).json(landOwners);
    } catch (err) {
        next(err);
    }
});


router.post('/register', (req, res) => {

    let landOwners = req.body;
    const hash = bcrypt.hashSync(landOwners.password, 8);
    landOwners.password = hash;

    LandOwners.addlandOwner(landOwners)
        .then(addedLandOwner => {
            res.status(201).json(addedLandOwner);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error registering, Try again' });
        })
})

router.post('/login', (req, res) => {
    const { name, password } = req.body;

    LandOwners.findByLandOwner({ name })
        .first()
        .then(landOwner => {
            if (landOwner && bcrypt.compareSync(password, landOwner.password)) {
                const token = getToken(landOwner);
                res.status(200).json({ message: 'Logged In', token });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            };
        }).catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error logging in, Try again' });
        })
});


router.post('/', (req, res) => {
    const landOwner = req.body;
    LandOwners.addlandOwner(landOwner)
        .then(landOwner => {
            res.status(200).json(landOwner);
        })
        .catch(error => {
            res.status(500).json({ message: 'error saving landOwner information' });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body
    LandOwners.updateLandOwner(req.params.id, changes)
        .then(landOwner => {
            res.status(200).json(landOwner);
        })
        .catch(error => {
            res.status(500).json({ message: 'error getting the landOwners data' })
        })


    router.removeLandOwner('/:id', (req, res) => {
        LandOwners.delete(req.params, id)
            .then(landOwner => {
                if (landOwner) {
                    res.status(201).json(landOwner)
                } else res.status(404).json({ message: 'LandOwner not found' })
            })
            .catch(error => {
                res.status(500).json(error)
            })
    })
})

function getToken(landOwner) {
    const payload = {
        subject: landOwner.id,
        username: landOwner.landOwnerName,
        // jwtid: user.id
    };
    const options = {
        expiresIn: '2h',
    };
    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router; 