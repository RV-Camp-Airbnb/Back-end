const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');



router.put('/:id', (req, res) => {
    const changes = req.body
    db('users')
        .where('id', '=', req.params.id)
        .update(changes)
        .then(cars => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: 'error getting the users data' })
        })

    router.delete('/:id', (req, res) => {
        db('users')
            .where('id', '=', req.params.id)
            .del()
            .then(users => {
                res.status(200).json({ message: 'users data has been deleted!' })
            })
    })
})


router.post('/', (req, res) => {
    let user = req.body;
    Users.addUsers(user)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: 'error saving user information' });
        });
});

module.exports = router;