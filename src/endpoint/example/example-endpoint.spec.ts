/**
 * Created by Miu on 29/04/2017.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../index';

/**
 * Basic tests for the eexample endpoint, to explain how to test endpoints.
 */

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {

    it('should be json', () => {
        return chai.request(app).get('/test')
            .then(res => {
                expect(res.type).to.eql('application/json');
            });
    });

    it('should have a message prop', () => {
        return chai.request(app).get('/test/1')
            .then(res => {
                expect(parseInt(res.body.id)).to.eql(1);
            });
    });

});