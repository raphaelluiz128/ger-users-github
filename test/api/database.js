const conn = require('../../src/app');

//arquivo para testar as rotas, 'expect' é usada para quando se espera algo da resposta da api
//abaixo  temos rotas sendo testadas para verificar se a app consegue se conectar com o banco.


    describe(' mongoose conection', () => {
        it('ok, -conected- works', (done) => {
            try {
                before((done) => {
                    conn.app.connect()
                      .then(() => done())
                      .catch((err) => done(err));
                })
                done();
            } catch (err) {
                console.log(err);
            }
        });
    });
