//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chai_http = require('chai-http');
const expect = chai.expect;

const server = require('../../app');
const db = require('../../models');

chai.use(chai_http);

describe('Routes', function () {

    const new_score = {
        date: Date.now(),
        score: 666
    };

    beforeEach((done) => {
        // remove all data
        db.sequelize.sync({ force: true, logging: false })
            .then(() => done());

    })

    it('GET /', function (done) {

        chai.request(server)
            .get('/')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.type).to.contain('text/html');
                expect(res.text).to.contain('<h1>SnakeREST</h1><p>Welcome to SnakeREST</p>');
                done();
            })
    })

    it('GET /scores/', function (done) {

        chai.request(server)
            .get('/scores/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res).to.have.status(200);
                expect(res.type).to.contain('application/json');
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.eq(0);
                done();
            })
    })

    it('POST /scores/', function (done) {

        chai.request(server)
            .post('/scores/')
            .send(new_score)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id').eq(1);
                expect(res.body).to.have.property('score').eq(new_score.score);
                expect(res.body).to.have.property('date').eq(new Date(new_score.date).toISOString())
                done();
            })
    })

    it('/DELETE/:id score', function (done) {

        db.Score.create(new_score).then((record) => {
            chai.request(server)
                .del('/score/' + record.id)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('id').eq(record.id);
                    done();
                });
        });
    })

    it('/GET/:id score', function (done) {

        db.Score.create(new_score).then((record) => {
            chai.request(server)
                .get('/score/' + record.id)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('id').eq(record.id);
                    done();
                });

        });
    })

})