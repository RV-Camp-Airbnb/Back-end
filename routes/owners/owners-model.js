
const db = require('../../database/db.Config');

module.exports = {
    find,
    findBy,
    addOwners,
    findByOwner,
    findLoggedIn
}

function find() {
    return db('owners').select('id', 'ownername', 'password');
}

function findBy(id) {
    return db('owners')
        .where({ id })
}

function addOwners(owner) {
    return db('owners')
        .insert(owner)
        .then(ids => {
            const id = ids[0];
            return findBy(id);
        })
}

function findByOwner(owner) {
    return db('owners')
        .where(owner)
}

function findLoggedIn(id) {
    return db('owners')
        .where({ id })
        .first()
}