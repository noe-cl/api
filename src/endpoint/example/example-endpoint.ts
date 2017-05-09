import { Endpoint } from "../../core/decorator/endpoint";
import { GetOne } from "../../core/decorator/get-one";
import { Post } from "../../core/decorator/post";
import { Put } from "../../core/decorator/put";
import { Delete } from "../../core/decorator/delete";
import { GetAll } from "../../core/decorator/get-all";
import { ExampleService } from "../../service/example-service";
import { Promise } from 'es6-promise';
/**
 * Created by Miu on 29/04/2017.
 *
 * Example endpoint, can be used as reference to create the other ones.
 */
@Endpoint({
    route: '/test'
})
export class ExampleEndpoint {

    constructor(private a: ExampleService) {
    }

    @GetOne()
    public getOne(id: number): Promise<any> {
        return new Promise(resolve => resolve({result: this.a.test()}));
    }

    @Post()
    public post(body: any): any {
        return body;
    }

    @Put()
    put(id: number, body: any): any {
        return {id: id, data: body};
    }

    @Delete()
    delete(id: number): any {
        return {id: id};
    }

    @GetAll()
    getAll(): any[] {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
}