const db = require('../../database/db.Config');

module.exports = {
    get,
    findBy,
    findById,
    addlandOwner,
    updateLandOwner,
    removeLandOwner

}

function get() {
    return db('landOwner')
}

function findById(id) {
    return db('landOwners')
        .where({ id })
        .first()
}

async function addlandOwner(landOwner) {
    if (process.env.NODE_ENV === "production") {
        const [newLandOwner] = await db('landOwners').addlandOwner(landOwner, ['id']);
        return findById(newLandOwner.id);
    } else {
        const [id] = await db('landOwners').addlandOwner(landOwner);
        return findById(id);
    }
}


function findBy(landOwner) {
    return db('landOwner')
        .where({ landOwner })
        .first()
}

function updateLandOwner(id, landOwner) {
    return db('landOwner')
        .where({ id })
        .update(landOwner)
}


function removeLandOwner(id) {
    return db('landOwner')
        .where({ id })
        .del();
}