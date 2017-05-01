import * as chai from "chai";
import {ExampleService} from "../../src/service/example-service";
import {ExampleEndpoint} from "../../src/endpoint/example/example-endpoint";
/**
 *  example unit tests*/
const expect = chai.expect;

class MockService extends ExampleService {
    public test(): string {
        return "bar";
    }
}

const endpoint = new ExampleEndpoint(new MockService());

describe('ExampleEndpoint', () => {

    it('should use mock service.', () => {
        return expect(endpoint.getOne(1)).to.eql({result: "bar"});
    });
});