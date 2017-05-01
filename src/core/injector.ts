import "reflect-metadata";
/**
 * Created by Miu on 01/05/2017.
 */
export class Injector {

    private static registry: { name: string, clazz: (new() => any) }[] = [];

    private static instances: { name: string, instance: any }[] = [];

    public static register(name: string, injectable: new(...args: any[]) => any): void {
        this.registry.push({name: name, clazz: injectable});
    }

    public static instantiate(clazz: new(...args: any[]) => any): any {
        let injection: any[] = [];
        let params = Reflect.getMetadata('design:paramtypes', clazz);
        if (params !== undefined) {
            for (let type of params) {
                let serviceName = /function (\w+)/.exec(type.toString())[1];
                let instance = this.getInstance(serviceName);
                injection.push(instance);
            }
        }
        let test = Object.create(clazz.prototype);
        test.constructor.apply(test, injection);
        return test;
    }

    private static getInstance(name: string): any {
        let serviceEntry = this.registry.filter(element => element.name === name)[0];
        if (serviceEntry === undefined) {
            throw new Error('No provider for service ' + name);
        }
        let instance = this.instances.filter(instance => instance.name === name)[0];
        if (instance === undefined) {
            instance = {name: name, instance: this.instantiate(serviceEntry.clazz)};
            this.instances.push(instance);
        }
        return instance.instance;
    }
}