import chai from 'chai';
import chaiHttp from 'chai-http';

const { expect } = chai;

chai.use(chaiHttp);

const domain = process.env.TEST_DOMAIN;
const port = process.env.TEST_PORT;
const server_path = `${domain}:${port}`;

describe('User Registration and Login API', () => {
    it('should register a new user with valid data', (done) => {
        chai.request(server_path)
            .post('/signup')
            .send({ email: 'newuser@example.com', password: 'validpassword' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').equal('User registered successfully');
                done();
            });
    });

    it('should not register a user with missing or invalid data', (done) => {
        chai.request(server_path)
            .post('/signup')
            .send({ email: 'invalidemail', password: 'short' })
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });

    it('should log in a user with valid credentials', (done) => {
        chai.request(server_path)
            .post('/login')
            .send({ email: 'newuser@example.com', password: 'validpassword' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Login successful');
                expect(res.body).to.have.property('token');
                done();
            });
    });

    it('should not log in a user with incorrect credentials', (done) => {
        chai.request(server_path)
            .post('/login')
            .send({ email: 'newuser@example.com', password: 'incorrectpassword' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });
});
