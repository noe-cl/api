/**
 * Created by Miu on 29/04/2017.
 */
import {use, request, expect} from "chai";
import app from "../src/index";

/**
 * Basic tests for the example endpoint, to explain how to test endpoints.
 *
 * THIS IS INTEGRATION TEST EXAMPLE.
 */

use(require("chai-http"));
describe('baseRoute', () => {

    it('should be json', () => {
        return request(app).get('/test')
            .then(res => {
                expect(res.type).to.eql('application/json');
            });
    });

    it('should have a message prop', () => {
        return request(app).get('/test/1')
            .then(res => {
                expect(res.body.result).to.eql("foo");
            });
    });

});