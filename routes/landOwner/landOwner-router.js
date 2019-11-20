const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const LandOwners = require('../landOwner/landOwner-model')
router.use(express.json())


// router.get('/', async (req, res, next) => {
//     try {
//         const landOwners = await LandOwners.get();
//         res.status(200).json(landOwners)
//     } catch (error) {
//         // next(error)
//     }
// });

//Getting LandOWners
// router.get('/landOwner', restricted, (req, res) => {
//     LandOwners.find()
//         .then(landOwners => {
//             // console.log(users)
//             res.json({ loggedInLandOwner: req.landOwnerName, landOwners })
//         })
//         .catch(err => {
//             // console.log(err);
//             res.status(500).json({ message: 'Error getting landOwners' });
//         })
// })

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

module.exports = router; 