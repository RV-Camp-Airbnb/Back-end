const db = require('../../database/db.Config');

module.exports = {
    find,
    findBy,
    addOwners,
    findByOwner,
    findLoggedIn

}

function get() {
    return db('landOwners')
}

function findById(id) {
    return db('landOwners')
        .where({ id })
        .first()
}


function addlandOwner(landOwners) {
    return db('landOwners')
        .insert(landOwners)
        .then(ids => {
            const id = ids[0]
            return findById(id)
        })
}


function findBy(landOwner) {
    return db('landOwners')
        .where({ landOwner })
        .first()
}

function findByLandOwner(landOwner) {
    return db('landOwners')
        .where(landOwner)
}

function updateLandOwner(id, landOwner) {
    return db('landOwners')
        .where({ id })
        .update(landOwner)
}


function removeLandOwner(id) {
    return db('landOwners')
        .where({ id })
        .del();
}
