const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const UserGH = mongoose.model('UserGH');

//arquivo para testar as rotas, 'expect' é usada para quando se espera algo da resposta da api
//abaixo temos rotas sendo testadas tanto no conteúdo de retorno quando no status de resposta.

describe('/POST  UserGH', () => {

    it('ok, -get UserGH from github- works', (done) => {
        const userGH = new UserGH({
            username: "username",
        });
        try {
            res = request(app).post('/userGHs/getGH').send(userGH);
            const body = res._data;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(201, done);
            done();
        } catch (err) {
            console.log(err);
        }
    });
}),
    describe('/GET  UserGH', () => {
        it('ok, -get all UserGHs from database- works', (done) => {
            try {
                res = request(app).get('/userGHs').send();
                expect(200);
                done();
            } catch (err) {
                console.log(err);
            }
        });
    });
