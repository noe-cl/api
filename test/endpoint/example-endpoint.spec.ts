import { expect } from "chai";
import { ExampleService } from "../../src/service/example-service";
import { ExampleEndpoint } from "../../src/endpoint/example/example-endpoint";
import { Injector } from "../../src/core/injector";
/**
 *  example unit tests
 */

class MockService extends ExampleService {
    public test(): string {
        return "bar";
    }
}

Injector.activateTestingMode();
Injector.registerMock(ExampleService, MockService);
const endpoint = Injector.instantiate(ExampleEndpoint);

describe('ExampleEndpoint', () => {

    it('should use mock service.', () => {
        return endpoint.getOne(1).then(data => expect(data).to.eql({result: "bar"}));
    });
});