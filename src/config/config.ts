import { Injectable } from "../core/decorator/injectable";
import * as fs from "fs";
/**
 * Created by Miu on 08/05/2017.
 */

@Injectable
export class Config {

    private _data: ConfigModel;

    private _path: string;

    constructor() {
        try {
            this._data = this.load('./src/config/config.json');
        } catch (e) {
            this._data = this.load('./src/config/config-sample.json');
        }
    }

    private load(path: string): ConfigModel {
        this._path = path;
        return <ConfigModel>JSON.parse(fs.readFileSync(path, 'utf-8'));
    }

    public get path(): string {
        return this._path;
    }

    public get data(): ConfigModel {
        return this._data;
    }
}

export interface ConfigModel {
    testing: boolean;
    db: {
        host: string,
        user: string,
        database: string,
        password: string,
        port: number
    };
    jwt: {
        secret: string
    };
}
