const db = require('../../database/db.Config');

module.exports = {
    register,
    find,
    findBy,
    addlandOwner,
    findBylandOwner,
    findLoggedIn
}

async function register(landOwner) {
    const [id] = await db('landOwner').insert(landOwner);

    return findById(id);
}


function find() {
    return db('landOwner').select('id', 'landOwnerName', 'password');
}

function findBy(id) {
    return db('landOwner')
        .where({ id })
}

function addlandOwner(landOwner) {
    return db('landOwner')
        .insert(landOwner)
        .then(ids => {
            const id = ids[0];
            return findBy(id);
        })
}

function findBylandOwner(landOwner) {
    return db('landOwner')
        .where(landOwner)
}

function findLoggedIn(id) {
    return db('landOwner')
        .where({ id })
        .first()
}