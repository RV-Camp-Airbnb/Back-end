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

