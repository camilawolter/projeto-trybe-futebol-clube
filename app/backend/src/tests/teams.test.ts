import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { listTeamsMock } from './mocks/teamsMock';

// import { app } from '../app';
import { App } from '../app';
import Team from '../database/models/TeamModel';

const { app } = new App();
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da seção de Teams', () => {

  afterEach(sinon.restore);
  
  let chaiHttpResponse: Response; 

  it('É realizado a listagem de todos os times', async function () {
    sinon.stub(Team, 'findAll').resolves(listTeamsMock as Team[]);

    chaiHttpResponse = await chai.request(app).get('/teams');

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(listTeamsMock);
  });
  it('é realizado a listagem de um time pelo seu id', async function () {
    sinon.stub(Team, 'findByPk').resolves(listTeamsMock[1] as Team);

    chaiHttpResponse = await chai.request(app).get('/teams/2');

    const { status, body } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(listTeamsMock[1]);
  })
});