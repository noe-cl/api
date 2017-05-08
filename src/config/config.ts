import { Injectable } from "../core/decorator/injectable";
import * as fs from "fs";
/**
 * Created by Miu on 08/05/2017.
 */

@Injectable
export class Config {

    private _data: ConfigModel;

    constructor() {
        this._data = JSON.parse(fs.readFileSync('./src/config/config.json', 'utf8'));
    }

    public get data():ConfigModel{
        return this._data;
    }
}

export interface ConfigModel {
    db: {
        host: string,
        user: string,
        database: string,
        password: string,
        port: number
    },
    jwt: {
        secret: string
    }
}
