const db = require('../database/db.Config');
const request = require('supertest');
const User = require('./auth-rv-model');
const server = require('./auth-rv-router');

describe('Users model', () => {
    beforeEach(async () => {

        await db('users').truncate();
    });
    describe('insert function', () => {

    });

    describe('insert function', () => {
        it('inserts users into the db', async () => {
            const UserNumber = await db('users');
            expect(UserNumber).toHaveLength(0);
            await User.findBy({ username: 'lambda', password: 'school' });
            expect(UserNumber).toHaveLength(0)
        });
    });

    describe('Post /users', function () {
        it('responds with json', function () {
            request(server)
                .post('/register')
                .send({ username: 'lambda', password: 'school' })

                .expect('Content-Type', /json/)
                .expect(201)
        });
    });

    describe('post /users', function () {
        it('responds with json', function () {
            request(server)
                .post('login')
                .send({ username: 'lambda' })

                .expect('Content-Type', /json/)
                .expect(201)
        })
    })
})

// describe('Post /users', function () {
//     it('responds with json', function () {
//         request()
//     })
// })