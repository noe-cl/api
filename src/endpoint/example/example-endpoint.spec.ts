/**
 * Created by Miu on 29/04/2017.
 */
import * as chai from "chai";
import app from "../../index";
import chaiHttp = require('chai-http');

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
                expect(res.body.result).to.eql("foo");
            });
    });

});