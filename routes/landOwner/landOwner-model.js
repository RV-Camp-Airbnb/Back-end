const db = require('../../database/db.Config');

module.exports = {
    get,
    findBy,
    findById,
    addlandOwner,
    updateLandOwner,
    removeLandOwner,
    findByLandOwner

}

function get() {
    return db('landOwners')
}

function findById(id) {
    return db('landOwners')
        .where({ id })
        .first()
}

// async function addlandOwner(landOwner) {
//     if (process.env.NODE_ENV === "production") {
//         const [newLandOwner] = await db('landOwners').addlandOwner(landOwner, ['id']);
//         return findById(newLandOwner.id);
//     } else {
//         const [id] = await db('landOwners').addlandOwner(landOwner);
//         return findById(id);
//     }
// }

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
