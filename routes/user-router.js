// const router = require('express').Router();
// const restricted = require('../middleware/restricted')
// const Users = require('../models/user-model')


// router.get('/', restricted, (req, res) => {

// })
// const express = require('express');
// const db = require('../database/db.Config');

// const router = express.Router();

// router.get('/', (req, res) => {
//     db('users')
//         .then(users => {
//             res.json(users)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error getting the users!' });
//         });
// });

// router.post('/', (req, res) => {
//     const user = req.body;
//     db('users')
//         .insert(user, 'id')
//         .then(user => {
//             res.status(200).json(user);
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error saving user information' });
//         });
// });

// router.put('/:id', (req, res) => {
//     const changes = req.body
//     db('users')
//         .where('id', '=', req.params.id)
//         .update(changes)
//         .then(cars => {
//             res.status(200).json(users);
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error getting the users data' })
//         })

//     router.delete('/:id', (req, res) => {
//         db('users')
//             .where('id', '=', req.params.id)
//             .del()
//             .then(users => {
//                 res.status(200).json({ message: 'users data has been deleted!' })
//             })
//     })
// })

// module.exports = router; 