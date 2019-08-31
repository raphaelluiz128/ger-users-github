const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Folder = mongoose.model('Folder');

//arquivo para testar as rotas, 'expect' é usada para quando se espera algo da resposta da api
//abaixo temos rotas sendo testadas tanto no conteúdo de retorno quando no status de resposta.

describe('/POST  folder', () => {

    it('ok, -create a new folder- works', (done) => {
        const folder = new Folder({
            name: "Pasta teste",
        });
        try {
            res = request(app).post('/folder').send(folder);
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
    describe('/PUT  folder', () => {
        it('ok, -update name of folder- works', (done) => {
            const folder = new Folder({
                name: 'novoTeste',
            });
            try {
                res = request(app).put('/folder').send(folder);
                expect(200, done);
                done();
            } catch (err) {
                console.log(err);
            }
        });
    }),
    describe('/GET  folder', () => {
        it('ok, -get all folders- works', (done) => {
            try {
                res = request(app).get('/folder').send();
                expect(200);
                done();
            } catch (err) {
                console.log(err);
            }
        });
    });
