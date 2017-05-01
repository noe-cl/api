import {Injectable} from "../core/decorator/injectable";
/**
 * Created by Miu on 01/05/2017.
 */
@Injectable
export class ExampleService {

    public test(): string {
        return "foo";
    }
}