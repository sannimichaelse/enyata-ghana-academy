/* eslint-disable max-len */
const {
    expect
} = require('chai');
const request = require('supertest');
const app = require('../../index');

describe('User APIs', async () => {
    let userToken = ''
    describe('Signup user - test 400 codes', () => {
        it('should fail while signing up a new user - 400', (done) => {
            request(app)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    email: "tomi@gmail.com",
                    password: "123456"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('name is required');
                    done();
                });
        });

        it('should signup user - 200', (done) => {
            request(app)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: "Mike",
                    email: "tomi@gmail.com",
                    password: "123456"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('New user added successfully');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.code).to.be.equal(201);
                    done();
                });
        });

        it('should login user - 200', (done) => {
            request(app)
                .post('/api/v1/users/login')
                .set('Accept', 'application/json')
                .send({
                    email: "tomi@gmail.com",
                    password: "123456"
                })
                .end((err, res) => {
                    userToken = res.body.data.token;
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Authentication successful');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data.user).to.be.an('object');
                    expect(res.body.data.user.email).to.be.equal('tomi@gmail.com');
                    expect(res.body.data.token).to.be.a('string');
                    expect(res.body.code).to.be.equal(200);
                    done();
                });
        });

        it('should not add a book because without title', (done) => {
            request(app)
                .post('/api/v1/books')
                .set('authorization', userToken)
                .set('Accept', 'application/json')
                .send({
                    author: 'Hello mike'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('title is required');
                    done();
                });
        });

        it('should create a book', (done) => {
            request(app)
                .post('/api/v1/books')
                .set('authorization', userToken)
                .set('Accept', 'application/json')
                .send({
                    title: 'New book',
                    author: 'Hello mike'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.code).to.be.equal(201);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Books added successfully');
                    expect(res.body.data).to.be.an('object');
                    done();
                });
        });
    });

});