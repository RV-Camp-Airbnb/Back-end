const db = require('../../database/db.Config');

module.exports = {
    find,
    findBy,
    addLandOwner,
    findByLandOwner,
    findLoggedIn
}

function find() {
    return db('landOwner').select('id', 'landOwnerName', 'password');
}

function findBy(id) {
    return db('landOwner')
        .where({ id })
}

function addUsers(landOwner) {
    return db('landOwner')
        .insert(landOwner)
        .then(ids => {
            const id = ids[0];
            return findBy(id);
        })
}


function findByLandOwner(landOwner) {
    return db('landowner')
        .where(landOwner)
}

function findLoggedIn(id) {
    return db('landOwner')
        .where({ id })
        .first()
}