const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const User = mongoose.model('User');

//arquivo para testar as rotas, 'expect' é usada para quando se espera algo da resposta da api
//abaixo temos rotas sendo testadas tanto no conteúdo de retorno quando no status de resposta.

describe('/POST  user', () => {

    it('ok, -create a new user- works', (done) => {
        const user = new User({
            name: "Teste user",
            login: "teste@gmail.com",
            cpf: "1982738921",
            password: "123589",
            roles: "common"
        });
        try {
            res = request(app).post('/users').send(user);
            const body = res._data;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('login');
            expect(201,done);
            done();
        } catch (err) {
            console.log(err);
        }
    });
}),

    describe('/POST  users/auth', () => {
        it('ok, -authenticate- works', (done) => {
            const user = new User({
                login: "teste@gmail.com",
                password: "123589",
            });
            try {
                res = request(app).post('/users/auth').send(user);
                const body = res._data;
                expect(body).to.contain.property('_id');
                expect(200, done);
                done();
            } catch (err) {
                console.log(err);
            }
        });
    }),
    describe('/GET  users', () => {
        it('ok, -get all users- works', (done) => {
            try {
                res = request(app).get('/users').send();
                expect(200, done);
                done();
            } catch (err) {
                console.log(err);
            }
        });
    });
