import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { tokenValidMock, userValidMock } from './mocks/userMock';

// import { app } from '../app';
import { App } from '../app';
import User from '../database/models/UserModel';

const { app } = new App();
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da seção de login', () => {

  afterEach(sinon.restore);
  
  let chaiHttpResponse: Response;  

  it('O login é realizado com sucesso', async function () {
    sinon.stub(User, 'findOne').resolves(userValidMock as User);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(jwt, 'sign').resolves(tokenValidMock);

    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@user.com', password: 'secret_user'
    });

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body.token).not.to.be.undefined;
  });
  it('É realizado uma requisição sem senha', async function() {
    
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@user.com'
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });
  it('É realizado uma requisição sem email', async function() {
    
    chaiHttpResponse = await chai.request(app).post('/login').send({
      password: 'secret_user'
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });
  it('É realizado uma requisição com email incorreto', async function() {
    sinon.stub(User, 'findOne').resolves();

    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@usr.com', password: 'secret_user'
    });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password')
  });
  it('É realizado uma requisição com senha incorreto', async function() {
    sinon.stub(User, 'findOne').resolves();

    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@usr.com', password: 'secret_usr'
    });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password')
  });
});
