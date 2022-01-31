const assert = require('assert');
const request = require('supertest');
const cheerio = require('cheerio');
const server = require('./app')

describe('server', () => {

    it('should return HTML with expected title', (done) => {
        request(server)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .end((err, res) => {
                assert(res.text.includes('Home'), 'Has expected title')
                done()
            })
    });

    it('should return page as HTML with expected title', (done) => {
        request(server)
            .get('/asteroids')
            .expect(200)
            .expect('Content-Type', /html/)
            .end((err, res) => {
                assert(res.text.includes('Asteroids'), 'Has expected title')
                done()
            })
    });

    it('should 404 for other pages', (done) => {
        request(server)
            .get('/other')
            .expect(404)
            .end((err, res) => {
                assert(res.text.includes('ERROR'), 'Has expected error message')
                done()
            })
    });

    it('should have the correct headings', (done) => {
        request(server)
          .get('/')
          .expect('Content-Type', /html/)
          .expect(200)
          .end((err, res) => {
            const tree = cheerio.load(res.text)
            assert.equal(tree('h1').length, 1, 'Correct number of headings')
            assert.equal(tree('h1').text(), 'Home', 'Correct heading text')
            done()
          })
      })

})