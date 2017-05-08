import "reflect-metadata";
/**
 * Created by Miu on 01/05/2017.
 */
export class Injector {

    private static registry: Registry = {};

    private static mockRegistry: Registry = {};

    private static testingMode = false;

    private static instances: { name: string, instance: any }[] = [];

    public static registerMock(type: new(...args: any[]) => any, injectable: new(...args: any[]) => any): void {
        this.mockRegistry[(<any>type).name] = injectable;
    }

    public static register(name: string, injectable: new(...args: any[]) => any): void {
        if (this.registry[name] === undefined) {
            this.registry[name] = injectable;
        } else {
            console.warn("Tried to register injectable with name " + name + " but it's already taken.");
        }
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
        let finalInstance = Object.create(clazz.prototype);
        finalInstance.constructor.apply(finalInstance, injection);
        return finalInstance;
    }

    private static getInstance(name: string): any {
        let clazz = this.testingMode ? this.mockRegistry[name] || this.registry[name] : this.registry[name];
        if (clazz === undefined) {
            throw new Error('No provider for service ' + name);
        }
        let instance = this.instances.filter(instance => instance.name === name)[0];
        if (instance === undefined) {
            instance = {name: name, instance: this.instantiate(clazz)};
            this.instances.push(instance);
        }
        return instance.instance;
    }

    public static activateTestingMode(): void {
        this.testingMode = true;
        this.mockRegistry = {};
    }
}

class Registry {
    [index: string]: (new(...args: any[]) => any);
}