const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

// router.get('/', restricted, (req, res) => {
//     Users.find()
//         .then(users => {
//             res.json({ users, loggedInUser: req.user.username });
//         })
//         .catch(err => res.send(err))
// });

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