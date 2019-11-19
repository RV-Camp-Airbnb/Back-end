const express = require('express');
const router = express.Router();
const LandOwners = require('../landOwner/landOwner-model')
router.use(express.json())


router.get('/', async (req, res) => {
    try {
        const landOwners = await LandOwners.get();
        res.status(200).json(landOwners)
    } catch (error) {
        next(error)
    }
});

router.post('/', (req, res) => {
    const landOwner = req.body;
    LandOwners.insert(landOwner)
        .then(saved => {
            res.status(200).json(saved);
        })
        .catch(error => {
            res.status(500).json({ message: 'error saving landOwner information' });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body
    LandOwners.update(req.params.id, changes)
        .then(landOwner => {
            res.status(200).json(landOwner);
        })
        .catch(error => {
            res.status(500).json({ message: 'error getting the landOwners data' })
        })


    router.delete('/:id', (req, res) => {
        LandOwners.remove(req.params, id)
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